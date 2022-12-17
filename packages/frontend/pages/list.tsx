import {
  Badge,
  Button,
  Card,
  Container,
  Grid,
  Navbar,
  Text,
} from '@nextui-org/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Head from 'next/head';
import Image from 'next/image';
import { useAccount, useNetwork } from 'wagmi';
import Index from '../components';
import styles from '../styles/detail.module.less';
import Nav from '../components/TaskNav';
import TaskHead from '../components/TaskHead';
import TaskNav from '../components/TaskNav';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { orderReader } from '../lib/orderRead';
import { DAOTaskOrder } from '../typechain-types';
import moment from 'moment';
export default function Home() {
  const { address, isConnected, status } = useAccount();
  const { chain: currentChain } = useNetwork();
  const [activeType, setActiveType] = useState(0);
  const router = useRouter();

  const [orderGroups, setOrderGroups] = useState<
    DAOTaskOrder.OrderGroupStruct[]
  >([]);

  async function getOrders() {
    const _orderGroups = (await orderReader.publisherOrderGroups(
      address as string,
    )) as any;

    setOrderGroups(_orderGroups);
  }

  useEffect(() => {
    if (isConnected) {
      getOrders();
    }
  }, [isConnected]);
  return (
    <div className={styles.container}>
      <TaskHead />
      <main className={styles.main}>
        <TaskNav />
        <div className={styles.list_page}>
          <Container
            display="flex"
            alignItems="center"
            justify="center"
            css={{ marginTop: '4vh' }}
          >
            <Card css={{ mw: '840px', p: '20px' }}>
              <Text
                size={24}
                weight="bold"
                css={{
                  as: 'center',
                  mb: '20px',
                }}
              >
                收到的项目
              </Text>
              <Navbar variant="static" isBordered={false} disableShadow={true}>
                <Navbar.Content variant="underline">
                  <Navbar.Link
                    isActive={activeType == 0}
                    onClick={() => {
                      setActiveType(0);
                    }}
                  >
                    我发起的
                  </Navbar.Link>
                  <Navbar.Link
                    isActive={activeType == 1}
                    onClick={() => {
                      setActiveType(1);
                    }}
                  >
                    我参与的
                  </Navbar.Link>
                  <Navbar.Link
                    isActive={activeType == 2}
                    onClick={() => {
                      setActiveType(2);
                    }}
                  >
                    我参与仲裁的
                  </Navbar.Link>
                </Navbar.Content>
              </Navbar>
              <div style={{ marginTop: '20px' }}>
                <Grid.Container gap={2} justify="left">
                  {orderGroups.map((orderGroup, index) => {
                    return (
                      <Grid xs={6} key={index}>
                        <Card css={{ mw: '100%', p: '20px' }} variant="flat">
                          <Link
                            href={'/detail?orderGroupId=' + orderGroup}
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              flexDirection: 'row',
                              cursor: 'pointer',
                            }}
                          >
                            <Text>{orderGroup.title as string}</Text>

                            <Badge size="sm">
                              {moment(
                                1000 * parseInt(orderGroup.createAt as string),
                              ).format('YYYY-MM-DD')}
                            </Badge>
                          </Link>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid.Container>
              </div>
            </Card>
          </Container>
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
