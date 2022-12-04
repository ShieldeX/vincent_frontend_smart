import React, { useState } from "react";

import type { NextPage } from "next";

import { Box, Button, Grid } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import Image from "next/image";
// import {Tabs} from "../components";
import { useAccount } from "wagmi";
import { Layout, Tabs } from "../components";

export default function Home() {
  const { isConnected } = useAccount();
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
    <Layout>
      <Grid
        container
        justifyContent="center"
        alignContent="center"
        direction="column"
        spacing={0}
        style={{
          minHeight: "90vh",
        }}
      >
        <Grid item xs={12}>
          <Box
            sx={{
              borderRight: "#fefefe 1px solid",
              display: "flex",
              // alignItems: "center",
              marginTop: "1rem",
              flexDirection: "column",
            }}
          >
            {/* <Image
              src={require("../public/assets/fastnft.png") || "/logo.png"}
              alt="fastnft"
              // width="750rem"
              // height="650rem"
              unoptimized={true}
            /> */}

            <Box>
              <Box
                className="custom-button"
                display="flex"
                flexDirection="column"
                gap={2}
                marginBottom="5rem"
                marginTop="-2rem"
                alignItems="center"
              >
                <ConnectButton label="Connect Wallet" />

                {!isConnected && (
                  <Box
                    sx={{
                      lineHeight: "1.5rem",
                      letterSpacing: "0.1rem",
                      fontSize: "0.8rem",
                    }}
                  >
                    Please connect your wallet to continue
                  </Box>
                )}
              </Box>
            </Box>
            {isConnected && <Tabs />}
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
}
