import { Badge, Button, Card, Container, Grid, Navbar, Text } from '@nextui-org/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Head from 'next/head';
import Image from 'next/image';
import { useAccount, useNetwork } from 'wagmi';
import Index from '../components';
import styles from '../styles/detail.module.less';
import Nav from '../components/TaskNav';
import TaskHead from '../components/TaskHead';
import TaskNav from '../components/TaskNav';
import { useState } from 'react';
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
                <Navbar variant="static"  isBordered={false} disableShadow={true}>

                  <Navbar.Content  variant="underline">
                    <Navbar.Link  isActive={activeType == 0} onClick={()=>{
                      setActiveType(0)}
                    }>
                      我发起的
                    </Navbar.Link>
                    <Navbar.Link isActive={activeType == 1} onClick={()=>{
                      setActiveType(1)}
                    }>
                      我参与的
                    </Navbar.Link>
                    <Navbar.Link isActive={activeType == 2} onClick={()=>{
                      setActiveType(2)}
                    }>
                      我参与仲裁的
                    </Navbar.Link>
                  </Navbar.Content>
                </Navbar>
              <div style={{ marginTop: '20px' }}>
                <Grid.Container gap={2} justify="left">
                  <Grid xs={6}>
                    <Card css={{ mw: '100%', p: '20px' }}  variant="flat" style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                      <Text>项目标题xxxxx</Text>
                      <Text style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}><Text color={"secondary"}>100</Text>{' '}USDT</Text>
                      <Badge size="sm">待开发</Badge>
                    </Card>
                  </Grid>
                  <Grid xs={6}>
                    <Card css={{ mw: '100%', p: '20px' }}  variant="flat" style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                      <Text>项目标题xxxxx</Text>
                      <Text style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}><Text color={"secondary"}>100</Text>{' '}USDT</Text>
                      <Text style={{
                        color:"#999999",
                        fontSize:'12px'
                      }}>时间：2022-12-29</Text>
                    </Card>
                  </Grid>
                  <Grid xs={6}>
                    <Card css={{ mw: '100%', p: '20px' }}  variant="flat" style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                      <Text>项目标题xxxxx</Text>
                      <Text style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}><Text color={"secondary"}>100</Text>{' '}USDT</Text>
                      <Text style={{
                        color:"#999999",
                        fontSize:'12px'
                      }}>时间：2022-12-29</Text>
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
