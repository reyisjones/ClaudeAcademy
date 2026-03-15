terraform {
  required_version = ">= 1.7"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.100"
    }
  }

  backend "azurerm" {
    resource_group_name  = "claudetuts-tfstate"
    storage_account_name = "claudetutsstatestore"
    container_name       = "tfstate"
    key                  = "claudetuts.tfstate"
  }
}

provider "azurerm" {
  features {}
}

# Resource Group
resource "azurerm_resource_group" "main" {
  name     = var.resource_group_name
  location = var.location
  tags     = local.common_tags
}

# Container App Environment
resource "azurerm_container_app_environment" "main" {
  name                       = "claudetuts-env"
  location                   = azurerm_resource_group.main.location
  resource_group_name        = azurerm_resource_group.main.name
  log_analytics_workspace_id = azurerm_log_analytics_workspace.main.id
}

# Log Analytics
resource "azurerm_log_analytics_workspace" "main" {
  name                = "claudetuts-logs"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  sku                 = "PerGB2018"
  retention_in_days   = 30
}

# Frontend Container App
resource "azurerm_container_app" "frontend" {
  name                         = "claudetuts-frontend"
  container_app_environment_id = azurerm_container_app_environment.main.id
  resource_group_name          = azurerm_resource_group.main.name
  revision_mode                = "Single"

  template {
    container {
      name   = "frontend"
      image  = "ghcr.io/${var.github_org}/claudetuts-frontend:latest"
      cpu    = 0.5
      memory = "1Gi"

      env {
        name  = "NEXT_PUBLIC_API_URL"
        value = "https://${azurerm_container_app.backend.latest_revision_fqdn}"
      }
    }
  }

  ingress {
    target_port      = 3000
    external_enabled = true
    traffic_weight {
      percentage      = 100
      latest_revision = true
    }
  }
}

# Backend Container App
resource "azurerm_container_app" "backend" {
  name                         = "claudetuts-backend"
  container_app_environment_id = azurerm_container_app_environment.main.id
  resource_group_name          = azurerm_resource_group.main.name
  revision_mode                = "Single"

  template {
    container {
      name   = "backend"
      image  = "ghcr.io/${var.github_org}/claudetuts-backend:latest"
      cpu    = 1.0
      memory = "2Gi"

      env {
        name        = "ANTHROPIC_API_KEY"
        secret_name = "anthropic-api-key"
      }
      env {
        name  = "DATABASE_URL"
        value = "postgresql+asyncpg://${azurerm_postgresql_flexible_server.main.administrator_login}:${var.db_password}@${azurerm_postgresql_flexible_server.main.fqdn}/claudetuts"
      }
    }
  }

  secret {
    name  = "anthropic-api-key"
    value = var.anthropic_api_key
  }

  ingress {
    target_port      = 8000
    external_enabled = true
    traffic_weight {
      percentage      = 100
      latest_revision = true
    }
  }
}

# PostgreSQL Flexible Server
resource "azurerm_postgresql_flexible_server" "main" {
  name                   = "claudetuts-postgres"
  resource_group_name    = azurerm_resource_group.main.name
  location               = azurerm_resource_group.main.location
  version                = "16"
  administrator_login    = "claudetutsadmin"
  administrator_password = var.db_password
  sku_name               = "B_Standard_B1ms"
  storage_mb             = 32768
  zone                   = "1"
}

locals {
  common_tags = {
    project     = "claudetuts"
    environment = var.environment
    managed_by  = "terraform"
  }
}
