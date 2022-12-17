import { Navbar, Text } from '@nextui-org/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function TaskNav() {
  const router = useRouter();
  useEffect(() => {
    console.log(router.pathname);
  }, []);
  return (
    <Navbar variant="floating">
      <Navbar.Brand>
        <Text b color="inherit" hideIn="xs">
          TaskRewards
        </Text>
      </Navbar.Brand>
      <Navbar.Content hideIn="xs" variant="highlight-solid-rounded">
        <Navbar.Link href="/" isActive={router.pathname == '/'}>
          发起的项目
        </Navbar.Link>
        <Navbar.Link href="/list" isActive={router.pathname == '/list'}>
          收到的项目
        </Navbar.Link>
        <Navbar.Link href="/poap" isActive={router.pathname == '/poap'}>
          我的勋章
        </Navbar.Link>
      </Navbar.Content>
      <Navbar.Content>
        <ConnectButton />
      </Navbar.Content>
    </Navbar>
  );
}
