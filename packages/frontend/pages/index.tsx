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
import { useAccount, useNetwork, useBalance } from 'wagmi';
import Index from '../components';
import styles from '../styles/Home.module.css';
import { useState, useMemo } from 'react';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { Task } from '@mui/icons-material';

import Nav from '../components/TaskNav';
import TaskHead from '../components/TaskHead';
import TaskNav from '../components/TaskNav';
export default function Home() {
  const { address, isConnected, status } = useAccount();
  const { chain: currentChain } = useNetwork();

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

            <Button>提交</Button>
          </Card>
        </Container>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
