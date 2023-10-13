import { FC, useState, useEffect, ChangeEvent } from "react";
import {
  Box,
  Heading,

  VStack,
  Stack,
  Card,
  Button,
  CardBody,
  Text,
  CardHeader,
  Tag,
  Flex,
  InputGroup,
  Input,
  InputRightElement,
  Avatar,
  Stat,
  StatLabel,
  StatNumber,
  StatArrow,
  StatHelpText,
  HStack,
  Kbd,
  SkeletonCircle,
  SkeletonText,
  StackDivider,
  Link,
  Accordion,
  AccordionItem,
  AccordionIcon,
  AccordionButton,
  AccordionPanel,
  Skeleton,
  useToast,
} from "@chakra-ui/react";
import {
  Facebook,
  FileText,
  GitHub,
  Globe,
  MessageSquare,
  Search,
  Twitter,
} from "react-feather";
import { useSolanaToGPT } from "hooks/useSolanaToGPT";
import { useChat } from "./hooks";
import { Document, Page, pdfjs } from 'react-pdf';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const formatFirstZero = (value: any) => {
  if (Number(value) >= 1) {
    return Number(value).toFixed(2);
  } else {
    return Number(value).toFixed(14);
  }
}

const label = (tooltipItem: any) => {
  return "USD $" + formatFirstZero(tooltipItem.parsed.y);
};

const optionsChartPrice = {
  scales: {
    y: {
      ticks: {
        callback: function (value: any) {
          return formatFirstZero(value);
        }
      }
    }
  },
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Prices USD",
    },
    tooltip: {
      callbacks: {
        label: label,
      }
    },
  },
};

const optionsChartPricePrediction = {
  scales: {
    y: {
      ticks: {
        callback: function (value: any) {
          return formatFirstZero(value);
        }
      }
    }
  },
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Prices Prediction USD - 7 days",
    },
    tooltip: {
      callbacks: {
        label: label,
      }
    },
  },
};

const optionsChartMarketCap = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Market Cap USD",
    },
  },
};
const optionsChartVolume = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Volume USD",
    },
  },
};
const USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const USDate = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'short', timeStyle: 'short'
});

const AssistantContent: FC<{
  content: string;
}> = ({ content }) => {
  if (!content) return (<></>);

  return (
    <Box>
      <Text whiteSpace="pre-wrap" mb={4}>
        {content}
      </Text>
    </Box>
  );
};

const Chat: FC<IChatWithToken> = ({ token, section }) => {
  const { isLoading, loaded, tokenMeta, pubKey } = useChat(token);
  const { messages, sendStreamMessage, chatBoxRef, canWrite, loadingRef } = useSolanaToGPT(token);
  const [showBarPrice, setShowBarPrice] = useState(false);
  const [recheckBars, setRecheckBars] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const [chartPrice, setChartPrice] = useState<any>();
  const [chartPricePrediction, setChartPricePrediction] = useState<any>();
  const [chartMarketCap, setChartMarketCap] = useState<any>();
  const [chartVolume, setChartcChartVolume] = useState<any>();
  const PRICE_INDEX = 2;
  const PRICE_MARKET_CAP = 3;
  const PRICE_VOLUME = 4;
  const PRICE_DATE = 6;

  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const toast = useToast();

  const handleChangeText = (event: ChangeEvent<HTMLInputElement>) =>
    setInputValue(event.target.value);

  const handleClick = () => {
    if (!canWrite) return;
    if (pubKey === "") {
      toast({
        title: "Error",
        description: "You must connect your wallet to chat",
        status: "error",
        isClosable: true,
      });
      return;
    }
    sendStreamMessage(inputValue);
    setInputValue("");
  };

  useEffect(() => {
    UpdateCharts();
  }, [tokenMeta]);

  useEffect(() => {
    console.log(chartPrice, chartMarketCap, chartVolume);
    if (chartPrice && chartPrice.labels) {
      console.log("bar price loaded");
      setShowBarPrice(true);
    } else {
      const timer = setTimeout(() => {
        setRecheckBars(!recheckBars);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [chartPrice, chartMarketCap, chartVolume, recheckBars]);

  const UpdateCharts = () => {
    if (tokenMeta?.prices && tokenMeta?.prices.length > 0) {
      const labels: string[] = [];
      const labelsAll: string[] = [];
      const datasetMarketCap: number[] = [];
      const datasetVolume: number[] = [];

      const mapPrices: { [key: string]: number } = {};
      const mapPricesPrediction: { [key: string]: number } = {};
      const mapPricesPredictionLower: { [key: string]: number } = {};
      const mapPricesPredictionUpper: { [key: string]: number } = {};

      for (let i = 0; i < tokenMeta.prices.length; i++) {
        const date = tokenMeta.prices[i][PRICE_DATE].split(".")[0];
        mapPrices[date] = tokenMeta.prices[i][PRICE_INDEX];
        labelsAll.push(date);
        datasetMarketCap.push(tokenMeta.prices[i][PRICE_MARKET_CAP]);
        datasetVolume.push(tokenMeta.prices[i][PRICE_VOLUME]);
      }

      if (tokenMeta?.pricesPrediction && tokenMeta?.pricesPrediction.length > 0) {

        for (let j = 0; j < tokenMeta.pricesPrediction.length; j++) {
          const date = tokenMeta.pricesPrediction[j][0].split("T")[0];
          mapPricesPrediction[date] = tokenMeta.pricesPrediction[j][1];
          mapPricesPredictionLower[date] = tokenMeta.pricesPrediction[j][2];
          mapPricesPredictionUpper[date] = tokenMeta.pricesPrediction[j][3];
          labels.push(date);
        }
      }

      setChartPrice({
        labels: labelsAll,
        datasets: [
          {
            label: "Price",
            data: mapPrices,
            backgroundColor: "#75a67f",
          },
        ],
      });

      setChartPricePrediction({
        labels,
        datasets: [
          {
            label: "Price Prediction",
            data: mapPricesPrediction,
            backgroundColor: "#415e95",
            borderColor: "#415e95",
          },
          {
            label: "Price Prediction Lower",
            data: mapPricesPredictionLower,
            backgroundColor: "#ca4c5e",
            borderColor: "#ca4c5e",
          },
          {
            label: "Price Prediction Upper",
            data: mapPricesPredictionUpper,
            backgroundColor: "#0d9328",
            borderColor: "#0d9328",
          },
        ],
      });

      setChartMarketCap({
        labels: labelsAll,
        datasets: [
          {
            label: "Market Cap",
            data: datasetMarketCap,
            backgroundColor: "#c4be64",
          },
        ],
      });
      setChartcChartVolume({
        labels: labelsAll,
        datasets: [
          {
            label: "Volume 24hs",
            data: datasetVolume,
            backgroundColor: "#ca8350",
          },
        ],
      });
    }
  };

  if(isLoading) {
    return (
      <HStack
      w="100%"
      alignItems="flex-start"
      justifyContent="flex-start"
      alignContent="start"
    >
      <Box w="30%">
      <Box w="100%" padding="6" boxShadow="lg" bg="white">
      <SkeletonCircle size="10" />
      <SkeletonText
        mt="4"
        noOfLines={4}
        spacing="4"
        skeletonHeight="2"
      />
    </Box>
      </Box>
      <Box w="70%">
      <Box w="100%" padding="6" boxShadow="lg" bg="white">
      <SkeletonCircle size="10" />
      <SkeletonText
        mt="4"
        noOfLines={4}
        spacing="4"
        skeletonHeight="2"
      />
    </Box>
      </Box>

    </HStack>
    )
  }

  return (
    <HStack
      w="100%"
      alignItems="flex-start"
      justifyContent="flex-start"
      alignContent="start"
    >
      {loaded && (
        <Card w="30%" minH="80vh">
          <CardHeader>
            <Flex>
              <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                <Avatar name="Segun Adebayo" src={tokenMeta?.meta.logo} />

                <Box>
                  <Heading size="sm">{tokenMeta?.meta.name}</Heading>
                  <Kbd>{tokenMeta?.meta.symbol}</Kbd>
                </Box>
              </Flex>
            </Flex>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Price
                </Heading>
                <Flex direction="row" gap={4} flex={1}>
                  <Box w="50%">
                    <Stat>
                      <Flex>
                        <StatLabel>Last 24 hours</StatLabel>
                        <StatHelpText ml={2}>
                          <StatArrow
                            type={
                              (tokenMeta?.quote?.quote?.USD
                                ?.percent_change_1h || 0) >= 0
                                ? "increase"
                                : "decrease"
                            }
                          />
                          {tokenMeta?.quote.quote.USD.percent_change_1h.toFixed(
                            2
                          )}
                          %
                        </StatHelpText>
                      </Flex>
                      <StatNumber>
                        ${tokenMeta?.quote.quote.USD.price.toFixed(10)}
                      </StatNumber>
                    </Stat>
                    <Stat>
                      <StatLabel>Market Cap</StatLabel>
                      <StatNumber>
                        {tokenMeta?.quote.quote.USD.market_cap
                          ? USDollar.format(
                            tokenMeta?.quote.quote.USD.market_cap
                          )
                          : USDollar.format(
                            tokenMeta?.quote.self_reported_market_cap
                          )}
                      </StatNumber>
                    </Stat>
                  </Box>
                  <Box>
                    <Flex direction="column" gap={4}>
                      <Stat>
                        <StatLabel>Circulating Supply</StatLabel>
                        <StatNumber>
                          {tokenMeta?.quote.circulating_supply
                            ? USDollar.format(
                              tokenMeta?.quote.circulating_supply
                            ).replace('$', '').split('.')[0]
                            : USDollar.format(
                              tokenMeta?.quote
                                .self_reported_circulating_supply
                            ).replace('$', '').split('.')[0]}
                        </StatNumber>
                      </Stat>
                      <Stat>
                        <StatLabel>Volume 24 hours</StatLabel>
                        <StatNumber>
                          {USDollar.format(
                            tokenMeta?.quote.quote.USD.volume_24h || 0
                          )}
                        </StatNumber>
                      </Stat>
                    </Flex>
                  </Box>
                </Flex>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Resources
                </Heading>
                <Flex direction="column" gap={4} pt={2}>
                  {tokenMeta?.meta.urls?.website[0] && (
                    <Flex
                      direction="row"
                      gap={2}
                      alignItems="center"
                      justifyContent="flex-start"
                    >
                      <Globe />
                      <Text pt="2" fontSize="sm">
                        <Link href={tokenMeta?.meta.urls.website[0]} isExternal>
                          {tokenMeta?.meta.urls.website[0]}
                        </Link>
                      </Text>
                    </Flex>
                  )}
                  {tokenMeta?.meta.urls?.twitter[0] && (
                    <Flex
                      direction="row"
                      gap={2}
                      alignItems="center"
                      justifyContent="flex-start"
                    >
                      <Twitter />
                      <Text pt="2" fontSize="sm">
                        <Link href={tokenMeta?.meta.urls.twitter[0]} isExternal>
                          {tokenMeta?.meta.urls.twitter[0]}
                        </Link>
                      </Text>
                    </Flex>
                  )}
                  {tokenMeta?.meta.urls?.facebook[0] && (
                    <Flex
                      direction="row"
                      gap={2}
                      alignItems="center"
                      justifyContent="flex-start"
                    >
                      <Facebook />
                      <Text pt="2" fontSize="sm">
                        <Link
                          href={tokenMeta?.meta.urls.facebook[0]}
                          isExternal
                        >
                          {tokenMeta?.meta.urls.facebook[0]}
                        </Link>
                      </Text>
                    </Flex>
                  )}
                  {tokenMeta?.meta.urls?.explorer[0] && (
                    <Flex
                      direction="row"
                      gap={2}
                      alignItems="center"
                      justifyContent="flex-start"
                    >
                      <Search />
                      <Text pt="2" fontSize="sm">
                        <Link
                          href={tokenMeta?.meta.urls.explorer[0]}
                          isExternal
                        >
                          {tokenMeta?.meta.urls.explorer[0]}
                        </Link>
                      </Text>
                    </Flex>
                  )}
                  {tokenMeta?.meta.urls?.reddit[0] && (
                    <Flex
                      direction="row"
                      gap={2}
                      alignItems="center"
                      justifyContent="flex-start"
                    >
                      <MessageSquare />
                      <Text pt="2" fontSize="sm">
                        <Link href={tokenMeta?.meta.urls.reddit[0]} isExternal>
                          {tokenMeta?.meta.urls.reddit[0]}
                        </Link>
                      </Text>
                    </Flex>
                  )}
                  {tokenMeta?.meta.urls?.technical_doc[0] && (
                    <Flex
                      direction="row"
                      gap={2}
                      alignItems="center"
                      justifyContent="flex-start"
                    >
                      <FileText />
                      <Text pt="2" fontSize="sm">
                        <Link
                          href={tokenMeta?.meta.urls.technical_doc[0]}
                          isExternal
                        >
                          {tokenMeta?.meta.urls.technical_doc[0]}
                        </Link>
                      </Text>
                    </Flex>
                  )}
                  {tokenMeta?.meta.urls?.source_code[0] && (
                    <Flex
                      direction="row"
                      gap={2}
                      alignItems="center"
                      justifyContent="flex-start"
                    >
                      <GitHub />
                      <Text pt="2" fontSize="sm">
                        <Link
                          href={tokenMeta?.meta.urls.source_code[0]}
                          isExternal
                        >
                          {tokenMeta?.meta.urls.source_code[0]}
                        </Link>
                      </Text>
                    </Flex>
                  )}
                </Flex>
              </Box>
              {tokenMeta?.meta.self_reported_tags && (
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Tags
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    <Box gap={5}>
                      {tokenMeta?.meta.self_reported_tags.map(
                        (item: string) => (
                          <Tag
                            size="md"
                            mr={2}
                            mb={2}
                            key={item}
                            variant="solid"
                            bg="#ff5100"
                            color="#ffffff"
                            colorScheme="telegram"
                          >
                            {item}
                          </Tag>
                        )
                      )}
                    </Box>
                  </Text>
                </Box>
              )}
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  About {tokenMeta?.meta.name}
                </Heading>
                <Text fontSize="xs">{tokenMeta?.meta.description}</Text>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      )}

      <Card w="70%" minH="80vh">
        <CardHeader>
          <Heading size="md">
            {section === "chat" && (
              <Flex direction="row">

                <Text fontWeight="300" ml={2}>
                  {" "}
                  Chat with{" "}
                </Text>

                <Text fontWeight="700" ml={2}>
                  {tokenMeta?.meta.name}
                </Text>
                <Avatar
                  ml={2}
                  mt={-1}
                  size="sm"
                  name={tokenMeta?.meta.name}
                  src={tokenMeta?.meta.logo}
                />
              </Flex>
            )}
            {section === "prices" && (
              <Flex direction="row">

                <Text fontWeight="300" ml={2}>
                  {" "}
                  Prices for{" "}
                </Text>

                <Text fontWeight="700" ml={2}>
                  {tokenMeta?.meta.name}
                </Text>
                <Avatar
                  ml={2}
                  mt={-1}
                  size="sm"
                  name={tokenMeta?.meta.name}
                  src={tokenMeta?.meta.logo}
                />
              </Flex>
            )}
            {section === "about" && (
              <Flex direction="row">

                <Text fontWeight="300" ml={2}>
                  {" "}
                  About{" "}
                </Text>

                <Text ml={2} fontWeight="700" textAlign="center">
                  {tokenMeta?.meta.name}
                </Text>
                <Avatar
                  ml={2}
                  mt={-1}
                  size="sm"
                  name={tokenMeta?.meta.name}
                  src={tokenMeta?.meta.logo}
                />
              </Flex>
            )}
          </Heading>
        </CardHeader>
        <CardBody w="100%">
          {section === "chat" && (
            <>
              <Box
                flex={1}
                h="60vh"
                ref={chatBoxRef}
                overflowY="scroll"
                bg="gray.500"
                display="flex"
                flexDir="column"
                fontFamily="Roboto"
                p={2}
              >
                {messages.map(({ content, role, chunks }, i) => {
                  if (role === "system") return;
                  if (role === "assistant" && content === null) return;
                  return (
                    <Box key={`${content}_${i}`}>
                      {role === "function" && (
                        <Box p={0} mb={2} w="280px" display="none">
                          <Card p={4} minH="4rem">
                            <VStack gap={4}>
                              <Text w="100%">Doing a semantic search...</Text>
                              <HStack alignSelf="start"></HStack>
                            </VStack>
                          </Card>
                        </Box>
                      )}

                      {role === "user" && (
                        <Box p={0} mb={2} justifyContent="end" display="flex">
                          <Card p={4} minH="4rem">
                            <Text>{content}</Text>
                          </Card>
                        </Box>
                      )}

                      {role === "assistant" && (
                        <Box p={0} mb={2} alignSelf="flex-start" pr={8}>
                          <Card p={4} w="100%">
                            <Flex position="relative" minH="4rem">
                              <AssistantContent content={content} />
                            </Flex>
                          </Card>
                        </Box>
                      )}

                      {role === "stream" && content != "" && (
                        <Box p={0} mb={2} alignSelf="flex-start" pr={8}>
                          <Card p={4} w="100%">
                            <Flex position="relative" minH="4rem">
                              <AssistantContent content={content} />
                            </Flex>
                          </Card>
                        </Box>
                      )}
                    </Box>
                  );
                })}
                <Box w="100%" p={0} mb={2} alignSelf="flex-start" display="none" pr={8} ref={loadingRef}>
                  <Skeleton>
                    <div>contents wrapped</div>
                    <div>won't be visible</div>
                  </Skeleton>
                </Box>
              </Box>

              <InputGroup size="lg" mt={4}>
                <Input
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      handleClick();
                    }
                  }}
                  pr="4.5rem"
                  type="text"
                  value={inputValue}
                  onChange={handleChangeText}
                  placeholder="Send message"
                />
                <InputRightElement width="4.5rem" pr={2}>
                  <Button disabled={canWrite} h="1.75rem" bg="#ff5100" color="#ffffff" size="sm" onClick={() => handleClick()}>
                    Send
                  </Button>
                </InputRightElement>
              </InputGroup>
            </>
          )}

          {section === "prices" && (
            <>
              {showBarPrice && (
                <Bar options={optionsChartPrice} data={chartPrice} />
              )}
              {chartPricePrediction && chartPricePrediction.labels && (
                <Line options={optionsChartPricePrediction} data={chartPricePrediction} />
              )}
              {chartVolume && chartVolume.labels && (
                <Bar options={optionsChartVolume} data={chartVolume} />
              )}
              {chartMarketCap && chartMarketCap.labels && (
                <Bar options={optionsChartMarketCap} data={chartMarketCap} />
              )}
            </>
          )}

          {section === "about" && (
            <>
              <Text mb={2}>
                {tokenMeta?.about.replace('Summary:', '')}
              </Text>
              {tokenMeta?.meta.urls.technical_doc && tokenMeta?.meta.urls.technical_doc.length > 0 && tokenMeta?.meta.urls.technical_doc[0].indexOf('.pdf') === -1 && (
                <iframe title="Technical Documentation" style={{ width: '100%', minHeight: '58vh', marginTop: '1rem' }} src="http://docs.honey.land/whitepaper/honeyland"></iframe>
              )}

              {tokenMeta?.meta.urls.technical_doc && tokenMeta?.meta.urls.technical_doc.length > 0 && tokenMeta?.meta.urls.technical_doc[0].indexOf('.pdf') > 0 && (
                <Document file={tokenMeta?.meta.urls.technical_doc[0]} onLoadSuccess={onDocumentLoadSuccess}>
                  <Page pageNumber={pageNumber} />
                </Document>
              )}
              {tokenMeta?.pdfs && tokenMeta?.pdfs.length > 0 && (
                <Text mt={2} mb={2} fontWeight="700" textAlign="center">
                  {tokenMeta?.meta.name} PDFs from the Website
                </Text>
              )}
              
              <Accordion>
              {tokenMeta?.pdfs && tokenMeta?.pdfs.length > 0 && tokenMeta?.pdfs.map((pdf) => {
                  return (
                    <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box as="span" flex='1' textAlign='left'>
                          {pdf.split("/")[pdf.split("/").length - 1].toLowerCase().replace('.pdf', '').replace('_', ' ').replace('-', ' ').replace('-', ' ').replace('.', ' ')}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4} maxW="100%">
                    <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
                      <Page width={400} pageNumber={pageNumber} />
                    </Document>
                    </AccordionPanel>
                  </AccordionItem>

                  )
                })}
                </Accordion>
            </>
          )}

          <VStack direction="row" gap={2} spacing={2}></VStack>
        </CardBody>
      </Card>
    </HStack>
  );
};

export default Chat;
