import {
  Button,
  Input,
  Grid,
  Container,
  Navbar,
  Text,
  Card,
  Row,
  Col,
  Spacer,
  Dropdown,
} from '@nextui-org/react';
import ClearIcon from '@mui/icons-material/Clear';
import {
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  InputAdornment,
  Button as MuiButton,
  IconButton,
} from '@mui/material';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Head from 'next/head';
import Image from 'next/image';
import { useAccount, useNetwork, useBalance, useSignTypedData } from 'wagmi';
import Index from '../components';
import styles from '../styles/Home.module.css';
import { useState, useMemo, useEffect } from 'react';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { Task } from '@mui/icons-material';

import Nav from '../components/TaskNav';
import TaskHead from '../components/TaskHead';
import TaskNav from '../components/TaskNav';

import { signTypedData } from '@wagmi/core';
import { config } from '../config';
import toast from 'react-hot-toast';
export interface Order {
  amount: number;
  deadlineTimestamp: number;
}

export interface OrderGroup {
  title: string;
  employer: string;
  publisher: string;
  intercessor: string;
  token: string;
  orders: Order[];
}
export default function Home() {
  const { address, isConnected, status } = useAccount();
  const { chain: currentChain } = useNetwork();
  const [submitData, setSubmitData] = useState<OrderGroup>({
    title: 'demo',
    employer: '0xf603C89719F09EFcff4E575c28a1C95180FEc801',
    publisher: '0xf603C89719F09EFcff4E575c28a1C95180FEc801',
    intercessor: '0xf603C89719F09EFcff4E575c28a1C95180FEc801',
    token: '0xf603C89719F09EFcff4E575c28a1C95180FEc801',
    orders: [
      {
        amount: 10,
        deadlineTimestamp: 1000,
      },
    ],
  });

  useEffect(()=>{
    setSubmitData({
      ...submitData,
      publisher: address as any,
    })
  },[address])
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
  const { error, isLoading, signTypedDataAsync } = useSignTypedData();


  async function submit() {
    const loading = toast.loading('Loading...');
    const signParams = {
      domain:JSON.parse(JSON.stringify(domain)),
      types:JSON.parse(JSON.stringify(types)),
      value: JSON.parse(JSON.stringify(submitData)),
    }
    const signature = await signTypedDataAsync(signParams);
    // console.log('signature:', signature);
    // const recoveredAddr = recoverTypedSignature_v4({
    //   data: {
    //     types: signParams.types,
    //     domain: signParams.domain,
    //     primaryType: 'OrderGroup',
    //     message: signParams.value,
    //   },
    //   sig: signature,
    // });
    // console.log('recoveredAddr', recoveredAddr);
    var requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        data: JSON.parse(JSON.stringify(submitData)),
        launcher: submitData.publisher,
        expiresAt: new Date(new Date().getTime() + 1000 * 60 * 60 * 10),
        bussiness: 'task3test',
        signers: [submitData.employer, submitData.intercessor],
        domain:JSON.parse(JSON.stringify(domain)),
        types:JSON.parse(JSON.stringify(types)),
        signature,
        primaryType: 'OrderGroup',
      }),
      headers: {
        "Content-Type": "application/json",
      }
    };
  try{
    const res = await fetch('https://osign.vercel.app/api/offer', requestOptions)
    const data = await res.json()
    console.log(data)
    toast.success('success')
    toast.dismiss(loading)
  }catch(e){
    toast.dismiss(loading)
    toast.error('error')
  }


  }

  const [token, setToken] = useState<string>('');
  const [milestones, setMileStones] = useState<
    { ddl: dayjs | Null; amount: Number | Null }[]
  >([
    {
      ddl: null,
      amount: null,
    },
  ]);

  const handleChangeToken = (event: SelectChangeEvent) => {
    setToken(event.target.value as string);
  };

  const handleMilestonesChange = (index, event) => {
    let data = [...milestones];
    data[index][event.target.name] = event.target.value;
    setMileStones(data);
  };
  const handleMilestoneRemove = (index) => {
    let data = [...milestones];
    data.splice(index, 1);
    setMileStones(data);
  };

  const handleMilestoneAdd = () => {
    let newMilestone = { ddl: dayjs('2023-08-18T21:11:54'), amount: 100 };
    setMileStones([...milestones, newMilestone]);
  };
  // to do: submit form

  return (
    <div className={styles.container}>
      <TaskHead />
      <main className={styles.main}>
        <TaskNav />
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
              发起项目
            </Text>
            <Row>
              <Col>
                <TextField fullWidth label="任务名称" />
              </Col>
              <Spacer x={1} />
              <Col>
                <TextField fullWidth label="接收者地址" />
              </Col>
            </Row>
            <Spacer y={1} />
            <Row>
              <Col>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Token</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={token}
                    label="Token"
                    onChange={handleChangeToken}
                  >
                    <MenuItem value="LXP">LXP</MenuItem>
                    <MenuItem value="USDT">USDT</MenuItem>
                  </Select>
                </FormControl>
              </Col>
              <Spacer x={1} />
              <Col>
                <TextField fullWidth label="仲裁者地址" />
              </Col>
            </Row>
            <Spacer y={1} />
            <Row>
              <Col>
                <MuiButton onClick={handleMilestoneAdd} variant="text">
                  +添加里程碑
                </MuiButton>
              </Col>
            </Row>
            <Spacer y={1} />
            {milestones.map((milestone, index) => {
              return (
                <>
                  <Row key={index} align="center">
                    <Col span={1}>
                      <IconButton
                        onClick={() => handleMilestoneRemove(index)}
                        color="primary"
                        aria-label="upload picture"
                        component="label"
                      >
                        <ClearIcon />
                      </IconButton>
                    </Col>
                    <Spacer x="1" />
                    <Col span={11}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <FormControl fullWidth>
                          <DateTimePicker
                            label="Deadline"
                            name="ddl"
                            value={milestone.ddl}
                            onChange={(event) =>
                              handleMilestonesChange(index, event)
                            }
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </FormControl>
                      </LocalizationProvider>
                    </Col>
                    <Spacer x="1" />
                    <Col span={11}>
                      <TextField
                        name="amount"
                        label="报酬"
                        id="outlined-start-adornment"
                        fullWidth
                        value={milestone.amount}
                        onChange={(event) =>
                          handleMilestonesChange(index, event)
                        }
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              {token}
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Col>
                  </Row>
                  <Spacer y="1" />
                </>
              );
            })}

            <Button
              onClick={() => {
                submit();
              }}
            >
              提交
            </Button>
          </Card>
        </Container>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
