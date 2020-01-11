import React from "react";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import useSWR from 'swr'
import fetch from 'isomorphic-unfetch';
import Entry from '../src/components/Entry'

const Page = () => {
  const { data, error } = useSWR('/api/feed', (api) => fetch(api).then(r => r.json()))
  
  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={12} md={6}>
        <Box fontSize="h3.fontSize" py="2rem">
            Everyday BBQ
        </Box>
        <Paper>
            <List container>
                {data && data.feed.map((entry) => <Entry entry={entry}/>)}
            </List>
            </Paper>
      </Grid>
    </Grid>
  );
};

export default Page;
