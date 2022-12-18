import { Button, Navbar, Text, Card, Row, Col, Grid } from '@nextui-org/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Head from 'next/head';
import Image from 'next/image';
import { useAccount, useNetwork } from 'wagmi';
import Index from '../components';
import styles from '../styles/Home.module.css';
import Nav from '../components/TaskNav';
import TaskHead from '../components/TaskHead';
import TaskNav from '../components/TaskNav';
import { Container } from '@mui/system';
export default function Home() {
  const { address, isConnected, status } = useAccount();
  const { chain: currentChain } = useNetwork();
  const list = [
    {
      type: '发起者守约勋章',
      title: 'Orange',
      img: '/images/fruit-1.jpeg',
      price: '$5.50',
    },
    {
      type: '仲裁者守约勋章',
      title: 'Tangerine',
      img: '/images/fruit-2.jpeg',
      price: '$3.00',
    },
    {
      type: '发起者守约勋章',
      title: 'Cherry',
      img: '/images/fruit-3.jpeg',
      price: '$10.00',
    },
    {
      type: '仲裁者守约勋章',
      title: 'Lemon',
      img: '/images/fruit-4.jpeg',
      price: '$5.30',
    },
    {
      type: 'Builder守约勋章',
      title: 'Avocado',
      img: '/images/fruit-5.jpeg',
      price: '$15.70',
    },
    {
      type: 'Builder守约勋章',
      title: 'Lemon 2',
      img: '/images/fruit-6.jpeg',
      price: '$8.00',
    },
    {
      type: 'Builder守约勋章',
      title: 'Banana',
      img: '/images/fruit-7.jpeg',
      price: '$7.50',
    },
  ];
  return (
    <div className={styles.container}>
      <TaskHead />
      <main className={styles.main}>
        <TaskNav />
        <div className={styles.poap_page}>
          <Container
            display="flex"
            alignItems="center"
            justify="center"
            css={{ marginTop: '4vh', marginBottom: '4vh' }}
          >
            <Card css={{ p: '20px', marginTop: '20px' }}>
              <Text
                size={24}
                weight="bold"
                css={{
                  as: 'center',
                  mb: '20px',
                }}
              >
                发起者守约勋章
              </Text>

              <Grid.Container gap={2} justify="flex-start">
                {list.map((item, index) => (
                  <Grid xs={6} sm={3} key={index}>
                    <Card>
                      <Card.Body css={{ p: 0 }}>
                        <Card.Image
                          src={'https://nextui.org' + item.img}
                          objectFit="cover"
                          width="100%"
                          height={140}
                          alt={item.title}
                        />
                      </Card.Body>
                      <Card.Footer
                        css={{
                          justifyItems: 'flex-start',
                          bgColor: '#f234ff00',
                        }}
                        isBlurred
                      >
                        <Row wrap="wrap" justify="center" align="center">
                          <Text size={12} weight="bold" transform="uppercase">
                            {item.title}
                          </Text>
                        </Row>
                      </Card.Footer>
                    </Card>
                  </Grid>
                ))}
              </Grid.Container>
            </Card>
          </Container>
          <Container
            display="flex"
            alignItems="center"
            justify="center"
            css={{ marginTop: '4vh', marginBottom: '4vh' }}
          >
            <Card css={{ p: '20px', marginTop: '20px' }}>
              <Text
                size={24}
                weight="bold"
                css={{
                  as: 'center',
                  mb: '20px',
                }}
              >
                Builder守约勋章
              </Text>

              <Grid.Container gap={2} justify="flex-start">
                {list.map((item, index) => (
                  <Grid xs={6} sm={3} key={index}>
                    <Card>
                      <Card.Body css={{ p: 0 }}>
                        <Card.Image
                          src={'https://nextui.org' + item.img}
                          objectFit="cover"
                          width="100%"
                          height={140}
                          alt={item.title}
                        />
                      </Card.Body>
                      <Card.Footer
                        css={{
                          justifyItems: 'flex-start',
                          bgColor: '#f234ff00',
                        }}
                        isBlurred
                      >
                        <Row wrap="wrap" justify="center" align="center">
                          <Text size={12} weight="bold" transform="uppercase">
                            {item.title}
                          </Text>
                        </Row>
                      </Card.Footer>
                    </Card>
                  </Grid>
                ))}
              </Grid.Container>
            </Card>
          </Container>
          <Container
            display="flex"
            alignItems="center"
            justify="center"
            css={{ marginTop: '4vh', marginBottom: '4vh' }}
          >
            <Card css={{ p: '20px', marginTop: '20px' }}>
              <Text
                size={24}
                weight="bold"
                css={{
                  as: 'center',
                  mb: '20px',
                }}
              >
                仲裁者守约勋章
              </Text>

              <Grid.Container gap={2} justify="flex-start">
                {list.map((item, index) => (
                  <Grid xs={6} sm={3} key={index}>
                    <Card>
                      <Card.Body css={{ p: 0 }}>
                        <Card.Image
                          src={'https://nextui.org' + item.img}
                          objectFit="cover"
                          width="100%"
                          height={140}
                          alt={item.title}
                        />
                      </Card.Body>
                      <Card.Footer
                        css={{
                          justifyItems: 'flex-start',
                          bgColor: '#f234ff00',
                        }}
                        isBlurred
                      >
                        <Row wrap="wrap" justify="center" align="center">
                          <Text size={12} weight="bold" transform="uppercase">
                            {item.title}
                          </Text>
                        </Row>
                      </Card.Footer>
                    </Card>
                  </Grid>
                ))}
              </Grid.Container>
            </Card>
          </Container>
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
