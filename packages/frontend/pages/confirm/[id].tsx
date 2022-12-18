import {
  Badge,
  Button,
  Card,
  Container,
  Grid,
  Navbar,
  Text,
} from '@nextui-org/react';
import toast from 'react-hot-toast';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Head from 'next/head';
import Image from 'next/image';
import { useAccount, useNetwork, useSignTypedData } from 'wagmi';
import Index from '../../components';
import styles from '../../styles/detail.module.less';
import Nav from '../../components/TaskNav';
import TaskHead from '../../components/TaskHead';
import TaskNav from '../../components/TaskNav';
import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/router';
import { OrderGroup } from '..';
import { Data } from 'web3uikit';
import { config } from '../../config';
import { Refresh } from '@mui/icons-material';
import { orderReader } from '../../lib/orderRead';
import { BigNumber, utils } from 'ethers';

export interface OSignOffer {
  id: string;
  launcher: string;
  bussiness: string;
  status: number;
  staticData: OrderGroup;
  extData: object;
  expiresAt: string;
  signers: string[];
  signdata: object;
  createdAt: string;
  updatedAt: string;
}

function formatDate(date: Date) {
  return `${date.getFullYear()}/${date.getMonth()}/${date.getDay()} ${
    date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  }:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`;
}

export default function Confirm() {
  const [confirmData, setConfirmData] = useState<OSignOffer>({
    // id: 'e79fb0e7-34eb-4f18-b453-42e5cdae0ded',
    // launcher: '0xacf9dD5172cE19BFD910b8E8252a2E7b47C977df',
    // bussiness: 'task3test',
    // status: 0,
    // staticData: {
    //   title: 'test',
    //   token: '0x08c96B09C37bE4eA548718E5A4A5BA00B53f518c',
    //   orders: [{ amount: 13, deadlineTimestamp: 1672160820000 }],
    //   employer: '0xacf9dD5172cE19BFD910b8E8252a2E7b47C977df',
    //   publisher: '0xacf9dD5172cE19BFD910b8E8252a2E7b47C977df',
    //   intercessor: '0x863A0C95bF5dFc2b8404a81878dC5d533dbb523C',
    // },
    // extData: {},
    // expiresAt: '2022-12-17T19:47:50.215Z',
    // signers: [
    //   '0xacf9dD5172cE19BFD910b8E8252a2E7b47C977df',
    //   '0x863A0C95bF5dFc2b8404a81878dC5d533dbb523C',
    // ],
    // signdata: {"0x863A0C95bF5dFc2b8404a81878dC5d533dbb523C":"0xc8a8d10b54914c6db3f969cfe91294fe007ef64ad3c6c8494bb74f469538f81c49143497983eb266e93399f5539155cdfa13c592e6a0ceceaca906e8ecf3aacc1c"},
    // createdAt: '2022-12-17T09:47:55.388Z',
    // updatedAt: '2022-12-17T09:47:55.388Z',
  });
  const router = useRouter();
  const { address, isConnected, status } = useAccount();
  const [current, setCurrent] = useState('');
  const [EmployerSigned, setEmployerSigned] = useState(false);
  const [IntercessorSigned, setIntercessorSigned] = useState(false);
  const { error, isLoading, signTypedDataAsync } = useSignTypedData();
  const { chain: currentChain } = useNetwork();
  const [activeType, setActiveType] = useState(0);
  const { id } = router.query;

  const domain = {
    name: 'TaskRewards',
    version: '1',
    chainId: config.chain.id,
    verifyingContract: config.contract as any,
  };
  const types = {
    EIP712Domain: [
      { name: 'name', type: 'string' },
      { name: 'version', type: 'string' },
      { name: 'chainId', type: 'uint256' },
      { name: 'verifyingContract', type: 'address' },
    ],
    OrderGroup: [
      { name: 'title', type: 'string' },
      { name: 'employer', type: 'address' },
      { name: 'publisher', type: 'address' },
      { name: 'intercessor', type: 'address' },
      { name: 'token', type: 'address' },
      { name: 'orders', type: 'Order[]' },
    ],
    Order: [
      { name: 'amount', type: 'uint256' },
      { name: 'deadlineTimestamp', type: 'uint256' },
    ],
  };

  async function handleSign() {
    const loading = toast.loading('Loading...');

    const signParams = {
      domain: JSON.parse(JSON.stringify(domain)),
      types: JSON.parse(JSON.stringify(types)),
      value: JSON.parse(JSON.stringify(confirmData.staticData)),
    };
    const signature = await signTypedDataAsync(signParams);
    var requestOptions = {
      method: 'PUT',
      body: JSON.stringify({
        data: JSON.parse(JSON.stringify(confirmData.staticData)),
        signer: address,
        signature,
        domain: JSON.parse(JSON.stringify(domain)),
        types: JSON.parse(JSON.stringify(types)),
        primaryType: 'OrderGroup',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await fetch(
        `https://osign.vercel.app/api/offer/${id}`,
        requestOptions,
      );
      const data = await res.json();

      toast.success('success');
      getOrderGroup(id);
      toast.dismiss(loading);
    } catch (e) {
      toast.dismiss(loading);
      toast.error('error');
    }
  }

  async function getOrderGroup(id) {
    const loading = toast.loading('Loading...');
    var requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await fetch(
        `https://osign.vercel.app/api/offer/${id}`,
        requestOptions,
      );
      const data = await res.json();
      setConfirmData(data.data[0]);
      toast.success('success');
      toast.dismiss(loading);
      return data;
    } catch (e) {
      toast.dismiss(loading);
      toast.error('error');
    }
  }
  useEffect(() => {
    if (!id) return;
    getOrderGroup(id);
  }, [id]);
  useEffect(() => {
    if (!confirmData || !confirmData?.signdata) {
      return;
    }
    setEmployerSigned(
      Object.keys(confirmData?.signdata)
        .map((key) => key.toLocaleLowerCase())
        .includes(confirmData.staticData.employer.toLocaleLowerCase()),
    );
    setIntercessorSigned(
      Object.keys(confirmData?.signdata)
        .map((key) => key.toLocaleLowerCase())
        .includes(confirmData.staticData.intercessor.toLocaleLowerCase()),
    );
  }, [confirmData, current]);
  useEffect(() => {
    setCurrent(address);
  }, [address]);

  async function submit() {
    const loading = toast.loading('Loading...');
    try {
      await orderReader.createOrderGroup(
        confirmData.staticData.publisher,
        confirmData.staticData.employer,
        confirmData.staticData.intercessor,
        confirmData.staticData.title,
        '',
        confirmData.staticData.token,
        confirmData.staticData.orders.map((item) =>
          utils.parseEther(String(item.amount)),
        ),
        confirmData.staticData.orders.map((item) =>
          BigNumber.from(item.deadlineTimestamp),
        ),
        [
          '0xccdc5fcfbc73297efce8cc4794268da0583781d26f96a65589417e42dfafb1882daf4b52b3e0caef59cb9d33dfd3cd96cd475c4c210a53f24c5ce8a8ab8752e81b',
          '0xccdc5fcfbc73297efce8cc4794268da0583781d26f96a65589417e42dfafb1882daf4b52b3e0caef59cb9d33dfd3cd96cd475c4c210a53f24c5ce8a8ab8752e81b',
          '0xccdc5fcfbc73297efce8cc4794268da0583781d26f96a65589417e42dfafb1882daf4b52b3e0caef59cb9d33dfd3cd96cd475c4c210a53f24c5ce8a8ab8752e81b',
        ],
      );
      toast.success('success');
    } catch (e) {
      console.error(e);
      toast.dismiss(loading);
      toast.error('error');
    }
  }
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
                        {confirmData?.staticData?.title}
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
                        {confirmData?.staticData?.publisher}
                      </Text>
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
                      <Text>Builder</Text>

                      <Text
                        style={{
                          color: '#999999',
                          fontSize: '12px',
                        }}
                      >
                        {confirmData?.staticData?.employer}
                      </Text>
                      <Button
                        auto
                        size="sm"
                        color="primary"
                        onClick={() => {
                          handleSign();
                        }}
                        disabled={
                          current.toLocaleLowerCase() !=
                            confirmData?.staticData?.employer.toLocaleLowerCase() ||
                          EmployerSigned
                        }
                      >
                        {/* Sign */}
                        {EmployerSigned ? 'Signed' : 'Sign'}
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
                      <Text>仲裁者</Text>

                      <Text
                        style={{
                          color: '#999999',
                          fontSize: '12px',
                        }}
                      >
                        {confirmData?.staticData?.intercessor}
                      </Text>
                      <Button
                        auto
                        size="sm"
                        color="primary"
                        onClick={() => {
                          handleSign();
                        }}
                        disabled={
                          current.toLocaleLowerCase() !=
                            confirmData?.staticData?.intercessor.toLocaleLowerCase() ||
                          IntercessorSigned
                        }
                      >
                        {IntercessorSigned ? 'Signed' : 'Sign'}
                      </Button>
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
                        {confirmData?.staticData?.token}
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
                        {formatDate(new Date(confirmData?.createdAt))}
                      </Text>
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
                  {confirmData?.staticData?.orders?.map((order, index) => {
                    return (
                      <>
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
                            <Text>里程碑{index + 1}</Text>
                            <Text
                              style={{
                                color: '#999999',
                                fontSize: '12px',
                              }}
                            >
                              截止时间：
                              {formatDate(new Date(order.deadlineTimestamp))}
                            </Text>
                            <Text
                              style={{
                                color: '#999999',
                                fontSize: '12px',
                              }}
                            ></Text>
                          </Card>
                        </Grid>
                      </>
                    );
                  })}
                  <Button
                    auto
                    css={{ width: '100%' }}
                    color="primary"
                    onClick={() => {
                      submit();
                    }}
                    disabled={!EmployerSigned || !IntercessorSigned}
                    //to do: 需要判断有没有上过链
                  >
                    {/* Sign */}
                    {EmployerSigned && IntercessorSigned
                      ? '请发起人确认上链请求并支付'
                      : '请通知Builder和仲裁者签署合约'}
                  </Button>
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
