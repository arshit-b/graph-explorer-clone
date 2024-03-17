import React, {useEffect, useMemo, useState} from 'react';
import {Box, Grid, Typography} from '@mui/material';
import {useData} from 'src/store/DataProvider';
import ForceGraph from 'react-force-graph-2d';

const Home = () => {
  const {transactions, userList} = useData();

  const [windowDimension, setWindowDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const graph = useMemo(
    () => ({
      nodes: userList.map((user) => ({...user, id: user.address})),
      links: transactions.map((transaction) => {
        return {
          source: transaction.fromAddress,
          target: transaction.toAddress,
          ...transaction,
        };
      }),
    }),
    [userList, transactions],
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const graphWidth = windowDimension.width * 0.5;
  const graphHeight = windowDimension.height - 64;

  return (
    <Grid container>
      <Grid item xs={'auto'}>
        {transactions.map((transactions) => (
          <Box>
            <Typography variant={'h6'}>{transactions.fromAddress}</Typography>
            <Typography variant={'h6'}>{transactions.toAddress}</Typography>
            <Typography variant={'subtitle1'}>
              {transactions.amount}
            </Typography>
          </Box>
        ))}
      </Grid>
      <Grid item xs={'auto'}>
        <ForceGraph
          width={graphWidth}
          height={graphHeight}
          graphData={graph}
          nodeRelSize={8}
          cooldownTicks={100}
          nodeCanvasObject={(node, ctx, globalScale) => {
            ctx.beginPath();
            ctx.arc(node.x, node.y, 8, 0, 2 * Math.PI, false);
            ctx.fillStyle = '#000000';
            ctx.fill();
            ctx.closePath();

            ctx.beginPath();
            ctx.fillStyle = 'white';
            ctx.arc(node.x, node.y, 7, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.closePath();

            const name = node.name.substring(0, 2).toUpperCase();
            const fontSize = 6;
            const textWidth = ctx.measureText(name).width;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = `${fontSize}px Arial`;
            ctx.fillStyle = '#000000';
            ctx.fillText(name.substring(0, 2).toUpperCase(), node.x, node.y);

            node.__bckgDimensions = [textWidth + fontSize, 2 * fontSize];
          }}
        />
      </Grid>
    </Grid>
  );
};

export default Home;
