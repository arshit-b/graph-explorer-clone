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
import {Transaction, User} from 'src/types';
import UserItem from 'src/components/UserItem';
import Navbar from 'src/components/Navbar';
import {ArrowBack} from '@mui/icons-material';

const TransactionList = ({
  transactions,
  userMap,
}: {
  transactions: Transaction[];
  userMap: {[id: string]: User};
}) => (
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
                user={userMap[transaction.sourceAddress]}
              />
            </TableCell>
            <TableCell>
              <UserItem
                truncateAddress
                user={userMap[transaction.targetAddress]}
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
  const [isLoading, setIsLoading] = useState(true);
  const {transactions, userList, cachedImages, cacheImage} = useData();

  const [selectedUserAddress, setSelectedUserAddress] = useState<
    string | null
  >(null);
  const [selectedLink, setSelectedLink] = useState<{
    targetAddress: null | string;
    sourceAddress: null | string;
  }>({
    targetAddress: null,
    sourceAddress: null,
  });

  const graphRef = useRef<any>();

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

  useEffect(() => {
    const uncachedImageUris = userList
      .map((user) => user.imageUri)
      .filter((uri) => {
        return uri != null && cachedImages[uri] == null;
      });
    if (uncachedImageUris.length === 0) {
      setIsLoading(false);
      return;
    }
    const uncachedImagePromises = uncachedImageUris.map((uri) => {
      return new Promise<{uri: string; image: HTMLImageElement}>(
        (resolve, reject) => {
          const image = new Image();
          image.loading = 'eager';
          image.onload = () => resolve({uri, image});
          image.src = uri;
          setTimeout(() => reject(new Error('Image load timeout')), 2000);
        },
      );
    });

    Promise.allSettled(uncachedImagePromises)
      .then((responses) => {
        responses.forEach((response) => {
          if (response.status === 'fulfilled') {
            const {uri, image} = response.value;
            cacheImage(uri, image);
          }
        });
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [userList, cacheImage, cachedImages]);

  const graph = useMemo(
    () => ({
      nodes: userList.map((user) => ({...user, id: user.address})),
      links: transactions.map((transaction) => {
        return {
          source: transaction.sourceAddress,
          target: transaction.targetAddress,
          ...transaction,
        };
      }),
    }),
    [userList, transactions],
  );

  const drawerTransactions = useMemo(() => {
    if (
      !selectedUserAddress &&
      !selectedLink.sourceAddress &&
      !selectedLink.targetAddress
    ) {
      return transactions;
    }
    return transactions.filter(
      (transaction) =>
        [transaction.targetAddress, transaction.sourceAddress].includes(
          selectedUserAddress,
        ) ||
        (transaction.sourceAddress === selectedLink.sourceAddress &&
          transaction.targetAddress === selectedLink.targetAddress) ||
        (transaction.sourceAddress === selectedLink.targetAddress &&
          transaction.targetAddress === selectedLink.sourceAddress),
    );
  }, [transactions, selectedUserAddress, selectedLink]);

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

  const initSelectedLink = () => {
    setSelectedLink({
      targetAddress: null,
      sourceAddress: null,
    });
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
          <TransactionList
            userMap={userMap}
            transactions={drawerTransactions}
          />
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
          <TransactionList
            userMap={userMap}
            transactions={drawerTransactions}
          />
        </Drawer>
      </Box>
      {!isLoading && (
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
            onEngineStop={() => graphRef.current?.zoomToFit?.(400, 30)}
            linkDirectionalArrowRelPos={1}
            linkCurvature={0.1}
            onNodeClick={(node) => {
              initSelectedLink();
              if (selectedUserAddress === node.address) {
                setSelectedUserAddress(null);
              } else {
                setSelectedUserAddress(node.address);
              }
            }}
            onLinkClick={(link) => {
              setSelectedUserAddress(null);
              if (
                link.sourceAddress === selectedLink.sourceAddress &&
                link.targetAddress === selectedLink.targetAddress
              ) {
                initSelectedLink();
                return;
              }
              setSelectedLink(link);
            }}
            linkLabel={(link) =>
              Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              }).format(link.amount)
            }
            linkColor={(link) => {
              const isLinkHighlighted =
                [link.sourceAddress, link.targetAddress].includes(
                  selectedUserAddress,
                ) ||
                (link.sourceAddress === selectedLink.sourceAddress &&
                  link.targetAddress === selectedLink.targetAddress) ||
                (link.sourceAddress === selectedLink.targetAddress &&
                  link.targetAddress === selectedLink.sourceAddress);
              if (isLinkHighlighted) {
                return '#FF6E4A';
              }
              return '#A5A5A5';
            }}
            nodeCanvasObject={(node, ctx) => {
              const isSelectedNode =
                node.address === selectedUserAddress ||
                [
                  selectedLink.sourceAddress,
                  selectedLink.targetAddress,
                ].includes(node.address);
              const nodeSize = isSelectedNode ? 12 : 8;
              ctx.beginPath();
              ctx.arc(node.x, node.y, nodeSize, 0, 2 * Math.PI, false);
              ctx.fillStyle = isSelectedNode ? '#FF6E4A' : '#A5A5A5';
              ctx.fill();
              ctx.closePath();

              ctx.beginPath();
              ctx.fillStyle = 'white';
              ctx.arc(
                node.x,
                node.y,
                nodeSize - (isSelectedNode ? 1 : 0.5),
                0,
                2 * Math.PI,
                false,
              );
              ctx.fill();
              ctx.closePath();

              const drawImage = (image: HTMLImageElement) => {
                ctx.save();
                ctx.beginPath();
                ctx.createImageData(nodeSize, nodeSize);
                ctx.arc(
                  node.x,
                  node.y,
                  nodeSize - (isSelectedNode ? 2 : 1.5),
                  0,
                  2 * Math.PI,
                  false,
                );
                ctx.clip();
                ctx.drawImage(
                  image,
                  node.x - nodeSize,
                  node.y - nodeSize,
                  2 * nodeSize,
                  2 * nodeSize,
                );
                ctx.closePath();
              };

              const cachedImage = cachedImages[node.imageUri];

              if (cachedImage) {
                drawImage(cachedImage);
              }
              node.__bckgDimensions = [nodeSize, nodeSize];
            }}
          />
        </Box>
      )}

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
            <React.Fragment key={user.address}>
              <Divider />
              <ListItem>
                <UserItem key={user.address} user={user} />
              </ListItem>
            </React.Fragment>
          ))}
          <Divider />
        </List>
      </Drawer>
    </Box>
  );
};

export default Home;
