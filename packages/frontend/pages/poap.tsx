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
    {
      type: '发起者守约勋章',
      title: 'Watermelon',
      img: '/images/fruit-8.jpeg',
      price: '$12.20',
    },
  ];
  return (
    <div className={styles.container}>
      <TaskHead />
      <main className={styles.main}>
        <TaskNav />
        <div className={styles.poap_page}>
          <Grid.Container gap={2} justify="flex-start">
            {list.map((item, index) => (
              <Grid xs={6} sm={3} key={index}>
                <Card isPressable>
                  <Card.Header>{item.type}</Card.Header>
                  <Card.Body css={{ p: 0 }}>
                    <Card.Image
                      src={'https://nextui.org' + item.img}
                      objectFit="cover"
                      width="100%"
                      height={140}
                      alt={item.title}
                    />
                  </Card.Body>
                  <Card.Footer css={{ justifyItems: 'flex-start' }}>
                    <Row wrap="wrap" justify="space-between" align="center">
                      <Text b>{item.title}</Text>
                      <Text
                        css={{
                          color: '$accents7',
                          fontWeight: '$semibold',
                          fontSize: '$sm',
                        }}
                      >
                        {item.price}
                      </Text>
                    </Row>
                  </Card.Footer>
                </Card>
              </Grid>
            ))}
          </Grid.Container>
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
