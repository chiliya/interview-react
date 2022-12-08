import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { useTranslation } from 'react-i18next'
import { Center, Heading, Flex, Button, Text, Link, LinkBox, LinkOverlay } from '@chakra-ui/react'


export default function Home(props) {
  const { t, i18n } = useTranslation('nav')

  const router = useRouter()
  const { id } = router.query

  const [pageHeight, setPageHeight] = useState('')
  const [pageWidth, setPageWidth] = useState('')
  const [mousePos, setMousePos] = useState({
    x: 0,
    y: 0
  })
  const [date, setDate] = useState('0000年00月0日 00:00:00');
  const [ip, setIp] = useState('');


  useEffect(() => {
    getIPs(function (ip) { setIp(ip); });
    getPageSize();
    const timer = setInterval(getTime, 1000);
    window.addEventListener('resize', getPageSize)
    window.addEventListener('mousemove', mouseHandler)
    return () => {
      console.log('destroy');
      clearInterval(timer);
      window.removeEventListener('resize', getPageSize)
      window.removeEventListener('mousemove', mouseHandler)
    }
  }, [])

  //state 1 获取页面宽高
  const getPageSize = () => {
    setPageHeight(document.body.clientHeight)
    setPageWidth(document.body.clientWidth)
  }

  //state 2 鼠标坐标
  const mouseHandler = e => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }

  //state 3 时间
  const getTime = () => {
    const time = new Date();
    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const day = time.getDate();
    const hour = time.getHours();
    const minutes = time.getMinutes();
    const minutesF = minutes <= 9 ? "0" + minutes : minutes;
    const seconds = time.getSeconds();
    const secondsF = seconds <= 9 ? "0" + seconds : seconds;
    const timeNow = year + '/' + month + '/' + day + " " + hour + ":" + minutesF + ":" + secondsF;
    setDate(timeNow);
  }

  //state 4 ip
  //来源网络
  // WebRTC 
  function getIPs(callback) {
    let ip_dups = {};
    let RTCPeerConnection = window.RTCPeerConnection
      || window.mozRTCPeerConnection
      || window.webkitRTCPeerConnection;
    let useWebKit = !!window.webkitRTCPeerConnection;
    let mediaConstraints = {
      optional: [{ RtpDataChannels: true }]
    };
    // 这里就是需要的ICEServer了
    let servers = {
      iceServers: [
        { urls: "stun:stun.services.mozilla.com" },
        { urls: "stun:stun.l.google.com:19302" },
      ]
    };
    let pc = new RTCPeerConnection(servers, mediaConstraints);
    function handleCandidate(candidate) {
      let ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/
      let hasIp = ip_regex.exec(candidate)
      if (hasIp) {
        let ip_addr = ip_regex.exec(candidate)[1];
        if (ip_dups[ip_addr] === undefined)
          callback(ip_addr);
        ip_dups[ip_addr] = true;
      }
    }
    // 网络协商的过程
    pc.onicecandidate = function (ice) {
      if (ice.candidate) {
        handleCandidate(ice.candidate.candidate);
      }
    };
    pc.createDataChannel("");
    //创建一个SDP(session description protocol)会话描述协议 是一个纯文本信息 包含了媒体和网络协商的信息
    pc.createOffer(function (result) {
      pc.setLocalDescription(result, function () { }, function () { });
    }, function () { });
    setTimeout(function () {
      let lines = pc.localDescription.sdp.split('\n');
      lines.forEach(function (line) {
        if (line.indexOf('a=candidate:') === 0)
          handleCandidate(line);
      });
    }, 1000);
  }



  return (
    <Flex h="100%" flexDirection="column">
      <Center minH='200px' paddingTop='10'>
        <Heading as='h1' size='4xl'>
          Welcome to {t('home')}, {id}
        </Heading>
      </Center>
      <Flex padding={[5, 20]} flexGrow='1' justifyContent='center' alignItems='center' h='100%' >
        <Flex p='2' justifyContent='center' alignItems='center' flexDirection="column" h='100%' >
          <Button m='2' width="100%" colorScheme='gray' size='lg'>
            Language
          </Button>
          <Button m='2' width="100%" colorScheme='gray' size='lg' onClick={() => alert('nothing')}>
            nothing
          </Button>
        </Flex>
        <Flex flexWrap='wrap' ml='10' flexGrow='1' justifyContent='center' alignItems='center' h='100%' p='2' columns={[2, null, 4]} spacing='40px'
          border='1px' borderRadius='10px' borderColor='#eaeaea'>
          <LinkBox href="https://nextjs.org/docs">
            <Flex alignItems='center' p='2' m='2' minW='340px' height='120px' border='1px' borderRadius='10px' borderColor='#eaeaea'
              _hover={{ color: '#0070f3', borderColor: '#0070f3' }}>
              <LinkOverlay href="https://nextjs.org/docs">
                <Text fontSize='xl'>Status 1 &rarr;</Text>
                <Text>Page height: {pageHeight}</Text>
                <Text>Page width: {pageWidth}</Text>
              </LinkOverlay>
            </Flex>
          </LinkBox>
          <LinkBox href="https://nextjs.org/docs">
            <Flex alignItems='center' p='2' m='2' minW='340px' height='120px' border='1px' borderRadius='10px' borderColor='#eaeaea'
              _hover={{ color: '#0070f3', borderColor: '#0070f3' }}>
              <LinkOverlay href="https://nextjs.org/docs">
                <Text fontSize='xl'>Status 2 &rarr;</Text>
                <Text>Mouse position: x:{mousePos.x} y:{mousePos.y}</Text>
              </LinkOverlay>
            </Flex>
          </LinkBox>
          <LinkBox href="https://nextjs.org/docs">
            <Flex alignItems='center' p='2' m='2' minW='340px' height='120px' border='1px' borderRadius='10px' borderColor='#eaeaea'
              _hover={{ color: '#0070f3', borderColor: '#0070f3' }}>
              <LinkOverlay href="https://nextjs.org/docs">
                <Text fontSize='xl'>Status 3 &rarr;</Text>
                <Text>Current date: {date}</Text>
              </LinkOverlay>
            </Flex>
          </LinkBox>
          <LinkBox >
            <Flex alignItems='center' p='2' m='2' minW='340px' height='120px' border='1px' borderRadius='10px' borderColor='#eaeaea'
              _hover={{ color: '#0070f3', borderColor: '#0070f3' }}>
              <LinkOverlay href="https://nextjs.org/docs">
                <Text fontSize='xl'>Status 4 &rarr;</Text>
                <Text>Your IP: {ip}</Text>
              </LinkOverlay>
            </Flex>
          </LinkBox>
        </Flex>

      </Flex>
      <Center w='100%' minH='80px' borderTop='1px' borderColor='gray.300'>
        <Link
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </Link>
      </Center>
    </Flex >
  )


}

export async function getServerSideProps(ctx) {
  // this is to ensure server return the right content based on language in the query string.
  // updateLanguage(ctx)
  return {
    props: {
    }
  }
}
