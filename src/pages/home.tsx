import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import {useData} from 'src/store/DataProvider';
import ForceGraph from 'react-force-graph-2d';
import {User} from 'src/types';
import UserItem from 'src/components/UserItem';
import Navbar from 'src/components/Navbar';
import {ArrowBack} from '@mui/icons-material';

const TransactionList = ({transactions, userMap}) => (
  <TableContainer>
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>From</TableCell>
          <TableCell>To</TableCell>
          <TableCell align="right">Amount</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell component="th" scope="row">
              <UserItem
                truncateAddress
                user={userMap[transaction.fromAddress]}
              />
            </TableCell>
            <TableCell>
              <UserItem
                truncateAddress
                user={userMap[transaction.toAddress]}
              />
            </TableCell>
            <TableCell align="right">{transaction.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

const Home = () => {
  const {transactions, userList} = useData();

  const graphRef = useRef();

  const [showTransactionDrawer, setShowTransactionDrawer] =
    React.useState(false);

  const [isTransactionDrawerClosing, setIsTransactionDrawerClosing] =
    React.useState(false);

  const [showUserListDrawer, setShowUserListDrawer] = useState(false);

  const [windowDimension, setWindowDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

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

  const userMap = useMemo(() => {
    return userList.reduce<{[address: string]: User}>(
      (result, user) => ({...result, [user.address]: user}),
      {},
    );
  }, [userList]);

  const handleToggleUserListDrawer = () => {
    setShowUserListDrawer((prevShowUserListDrawer) => !prevShowUserListDrawer);
  };

  const handleTransactionsDrawerClose = () => {
    setIsTransactionDrawerClosing(true);
    setShowTransactionDrawer(false);
  };

  const handleTransactionsDrawerTransitionEnd = () => {
    setIsTransactionDrawerClosing(false);
  };

  const handleTransactionsDrawerToggle = () => {
    if (!isTransactionDrawerClosing) {
      setShowTransactionDrawer(!showTransactionDrawer);
    }
  };

  const drawerWidth = 400;

  const graphWidth =
    windowDimension.width < 600
      ? windowDimension.width
      : windowDimension.width - drawerWidth;

  const graphHeight = windowDimension.height - 64;

  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <Box>
      <Navbar
        onPressMenu={handleTransactionsDrawerToggle}
        onPressUserList={handleToggleUserListDrawer}
      />
      <Box sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}>
        <Drawer
          container={container}
          variant="temporary"
          open={showTransactionDrawer}
          onTransitionEnd={handleTransactionsDrawerTransitionEnd}
          onClose={handleTransactionsDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: {xs: 'block', sm: 'none'},
          }}>
          <Box className={'flex items-center my-2'}>
            <IconButton
              className={'w-fit'}
              onClick={handleTransactionsDrawerClose}>
              <ArrowBack />
            </IconButton>
            <Typography
              flex={1}
              fontWeight={'bold'}
              textAlign={'center'}
              variant={'h6'}>
              All Transactions
            </Typography>
          </Box>
          <TransactionList userMap={userMap} transactions={transactions} />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: {xs: 'none', sm: 'block'},
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              height: windowDimension.height - 64,
              mt: 8,
            },
          }}
          open>
          <TransactionList userMap={userMap} transactions={transactions} />
        </Drawer>
      </Box>
      <Box sx={{display: 'flex', mt: 8, justifyContent: {sm: 'flex-end'}}}>
        <ForceGraph
          ref={graphRef}
          nodeAutoColorBy="group"
          width={graphWidth}
          height={graphHeight}
          graphData={graph}
          nodeRelSize={8}
          linkWidth={2}
          cooldownTicks={100}
          linkDirectionalArrowLength={3}
          linkDirectionalArrowRelPos={1}
          linkCurvature={0.1}
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
      </Box>

      <Drawer
        anchor={'right'}
        open={showUserListDrawer}
        onClose={() => setShowUserListDrawer(false)}>
        <Box className={'flex items-center my-2'}>
          <Typography
            flex={1}
            fontWeight={'bold'}
            textAlign={'center'}
            variant={'h6'}>
            All Users
          </Typography>
          <IconButton
            className={'w-fit rotate-180'}
            onClick={handleToggleUserListDrawer}>
            <ArrowBack />
          </IconButton>
        </Box>
        <List>
          {userList.map((user) => (
            <>
              <Divider />
              <ListItem>
                <UserItem key={user.address} user={user} />
              </ListItem>
            </>
          ))}
          <Divider />
        </List>
      </Drawer>
    </Box>
  );
};

export default Home;
