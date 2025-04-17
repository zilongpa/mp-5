"use client";
import createNewAlias from "@/lib/createNewAlias";
import { Box, Button, Card, CardActions, CardContent, InputAdornment, inputBaseClasses, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function Home() {
  const [error, setError] = useState("");
  const [result, setResult] = useState("");

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <Card sx={{ maxWidth: "sm" }}>
        <CardContent>
          <form onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const result = await createNewAlias(formData.get("alias") as string, formData.get("url") as string);
            if (typeof result === "string") {
              setError(result);
              setResult("");
            } else {
              setError("");
              setResult(`https://mp-5-peach.vercel.app/${result.alias}`);
            }
          }}>
            <Typography variant="h4">
              Shorten a URL
            </Typography>
            <Typography variant="h6" color="textSecondary">
              Enter a long URL to create a shorter, shareable link.
            </Typography>
            <TextField name="url" id="url" label="URL" sx={{ mt: 2 }} fullWidth required />
            <TextField name="alias" id="alias" label="Custom Alias" sx={{ mt: 2 }} fullWidth slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{
                      opacity: 0,
                      pointerEvents: 'none',
                      [`[data-shrink=true] ~ .${inputBaseClasses.root} > &`]: {
                        opacity: 1,
                      },
                    }}
                  >
                    https://mp-5-peach.vercel.app/
                  </InputAdornment>
                ),
              },
            }} required />
            <Button variant="contained" sx={{ mt: 2 }} type="submit" color="success" fullWidth>Shorten</Button>
          </form>
        </CardContent>
        {
          error && error.length > 0 &&
          <CardActions>
            <Typography color="error" sx={{ ml: 2, mb: 1 }}>{error}</Typography>
          </CardActions>
        }
        {
          result && result.length > 0 &&
            <CardActions>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", ml: 1, mr: 1, mb: 1 }}>
                <Typography color="primary">Your shortened URL: <Typography color="textPrimary">{result}</Typography></Typography>
              <Button
              variant="outlined"
              color="primary"
              onClick={() => navigator.clipboard.writeText(result)}
              >
              Copy
              </Button>
            </Box>
            </CardActions>
        }
      </Card>
    </Box>
  );
}
