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
import { readContract } from '@wagmi/core';
import { DAOTaskOrder } from '../typechain-types/contracts/task3/DAOTaskOrder';
import { orderReader } from '../lib/orderRead';
import toast from 'react-hot-toast';
import moment from 'moment';
import { useRouter } from 'next/router';
export default function Home() {
  const { address, isConnected, status } = useAccount();
  const { chain: currentChain } = useNetwork();
  const [activeType, setActiveType] = useState(0);
  const router = useRouter();
  const [orderGroup, setOrderGroup] = useState<DAOTaskOrder.OrderGroupStruct>();
  const [orders, setOrders] = useState<DAOTaskOrder.OrderStruct[]>([]);
  async function getOrders() {
    const loading = toast.loading('加载中...');
    try {
      const data = await orderReader.orderGroup(
        router.query.orderGroupId as string,
      );
      setOrderGroup(data.orderGroup);
      setOrders(data.orders);
    } catch (e) {
      console.error(e);
      toast.error('加载失败');
    }
    toast.dismiss(loading);
  }

  useEffect(() => {
    if (router.query.orderGroupId) {
      getOrders();
    }
  }, [router.query.orderGroupId]);
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
            css={{ marginTop: '4vh', marginBottom: '4vh' }}
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
                项目详情
              </Text>

              <div style={{ marginTop: '20px' }}>
                <Text>项目信息：</Text>
                <Grid.Container gap={2} justify="left">
                  <Grid xs={6}>
                    <Card
                      css={{ mw: '100%', p: '20px' }}
                      variant="flat"
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}
                    >
                      <Text>标题</Text>

                      <Text
                        style={{
                          color: '#999999',
                          fontSize: '12px',
                        }}
                      >
                        {orderGroup?.title.toString() || ''}
                      </Text>
                    </Card>
                  </Grid>
                  <Grid xs={6}>
                    <Card
                      css={{ mw: '100%', p: '20px' }}
                      variant="flat"
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}
                    >
                      <Text>发起人</Text>

                      <Text
                        style={{
                          color: '#999999',
                          fontSize: '12px',
                        }}
                      >
                        {orderGroup?.publisher.toString()}
                      </Text>
                    </Card>
                  </Grid>
                  <Grid xs={6}>
                    <Card
                      css={{ mw: '100%', p: '20px' }}
                      variant="flat"
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}
                    >
                      <Text>Builder</Text>

                      <Text
                        style={{
                          color: '#999999',
                          fontSize: '12px',
                        }}
                      >
                        {orderGroup?.employer.toString()}
                      </Text>
                    </Card>
                  </Grid>
                  <Grid xs={6}>
                    <Card
                      css={{ mw: '100%', p: '20px' }}
                      variant="flat"
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}
                    >
                      <Text>仲裁者</Text>

                      <Text
                        style={{
                          color: '#999999',
                          fontSize: '12px',
                        }}
                      >
                        {orderGroup?.intercessor.toString()}
                      </Text>
                    </Card>
                  </Grid>
                  <Grid xs={6}>
                    <Card
                      css={{ mw: '100%', p: '20px' }}
                      variant="flat"
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}
                    >
                      <Text>结算 Token</Text>

                      <Text
                        style={{
                          color: '#999999',
                          fontSize: '12px',
                        }}
                      >
                        {orderGroup?.token.toString()}
                      </Text>
                    </Card>
                  </Grid>
                  <Grid xs={6}>
                    <Card
                      css={{ mw: '100%', p: '20px' }}
                      variant="flat"
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}
                    >
                      <Text>创建时间</Text>

                      <Text
                        style={{
                          color: '#999999',
                          fontSize: '12px',
                        }}
                      >
                        {moment(
                          1000 * parseInt(orderGroup?.createAt as string),
                        ).format('YYYY-MM-DD HH:mm:ss')}
                      </Text>
                    </Card>
                  </Grid>
                  <Grid xs={6}>
                    <Card
                      css={{ mw: '100%', p: '20px' }}
                      variant="flat"
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}
                    >
                      <Text>其他信息</Text>

                      <Text
                        style={{
                          color: '#999999',
                          fontSize: '12px',
                        }}
                      ></Text>
                    </Card>
                  </Grid>
                </Grid.Container>
                <Text
                  style={{
                    marginTop: '20px',
                  }}
                >
                  里程碑列表：
                </Text>

                <Grid.Container gap={2} justify="left">
                  {orders.map((order, i) => {
                    return (
                      <Grid xs={12} key={i}>
                        <Card
                          css={{ mw: '100%', p: '20px' }}
                          variant="flat"
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexDirection: 'row',
                          }}
                        >
                          <Text>里程碑状态</Text>

                          <Text
                            style={{
                              color: '#999999',
                              fontSize: '12px',
                            }}
                          >
                            时间：
                            {moment(
                              1000 *
                                parseInt(order.deadlineTimestamp.toString()),
                            ).format('YYYY-MM-DD')}
                          </Text>
                          <Text
                            style={{
                              color: '#999999',
                              fontSize: '12px',
                            }}
                          >
                            <Badge size="sm">
                              {order.status === 0
                                ? '开发中'
                                : order.status == 1
                                ? '已退单'
                                : order.status == 2
                                ? '等待仲裁'
                                : order.status == 3
                                ? '已结单'
                                : '已取消'}
                            </Badge>
                          </Text>
                          <Button auto size="sm" color="primary">
                            转移 NFT 给 BUIDLER
                          </Button>
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
