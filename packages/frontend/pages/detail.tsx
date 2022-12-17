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
export default function Home() {
  const { address, isConnected, status } = useAccount();
  const { chain: currentChain } = useNetwork();
  const [activeType, setActiveType] = useState(0);

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
                        谢谢谢谢谢寻寻寻寻寻寻寻寻寻寻
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
                        0xf603C89719F09EFcff4E575c28a1C95180FEc801
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
                        0xf603C89719F09EFcff4E575c28a1C95180FEc801
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
                        0xf603C89719F09EFcff4E575c28a1C95180FEc801
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
                        0xf603C89719F09EFcff4E575c28a1C95180FEc801
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
                        2022-12-02 00:00:00
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
                  <Grid xs={12}>
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
                        时间：2022-12-29
                      </Text>
                      <Text
                        style={{
                          color: '#999999',
                          fontSize: '12px',
                        }}
                      >
                        <Badge size="sm">待开发</Badge>
                      </Text>
                      <Button auto size="sm" color="primary">
                        转移 NFT 给 BUIDLER
                      </Button>
                    </Card>
                  </Grid>
                  <Grid xs={12}>
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
                        时间：2022-12-29
                      </Text>
                      <Badge size="sm">未结单</Badge>
                      <Button auto size="sm" color="primary">
                        请求仲裁介入
                      </Button>
                    </Card>
                  </Grid>
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
