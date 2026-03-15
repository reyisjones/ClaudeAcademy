"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

const NAV_LINKS = [
  { label: "Learn", href: "/learn" },
  { label: "Labs", href: "/labs" },
  { label: "Playground", href: "/playground" },
  { label: "Docs", href: "/docs" },
];

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid",
          borderColor: "divider",
          color: "text.primary",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ gap: 2 }}>
            {/* Logo */}
            <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
              <AutoAwesomeIcon sx={{ color: "secondary.main" }} />
              <Typography
                variant="h6"
                fontWeight={800}
                sx={{ color: "text.primary", letterSpacing: "-0.5px" }}
              >
                ClaudeTuts
              </Typography>
            </Link>

            <Box sx={{ flexGrow: 1 }} />

            {/* Desktop nav */}
            {!isMobile && (
              <Box sx={{ display: "flex", gap: 0.5 }}>
                {NAV_LINKS.map((link) => (
                  <Button
                    key={link.href}
                    component={Link}
                    href={link.href}
                    sx={{ color: "text.secondary", fontWeight: 500 }}
                  >
                    {link.label}
                  </Button>
                ))}
              </Box>
            )}

            <Button
              component={Link}
              href="/learn/claude-fundamentals"
              variant="contained"
              size="small"
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              Get Started
            </Button>

            {/* Mobile menu */}
            {isMobile && (
              <IconButton onClick={() => setDrawerOpen(true)} aria-label="Open menu">
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 260 } }}
      >
        <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={() => setDrawerOpen(false)} aria-label="Close menu">
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {NAV_LINKS.map((link) => (
            <ListItem key={link.href} disablePadding>
              <ListItemButton
                component={Link}
                href={link.href}
                onClick={() => setDrawerOpen(false)}
              >
                <ListItemText primary={link.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
