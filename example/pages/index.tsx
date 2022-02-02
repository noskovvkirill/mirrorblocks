import type { NextPage } from 'next'
import Head from 'next/head'
import { Crowdfund, Entry, Edition, EntryEdition, Poll } from 'mirrorblocks'
import { Stack, Box, Heading } from 'degen'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ width: "100%" }}>
        <Box width="full" padding="12"><Heading>Mirror Components</Heading></Box>
        <Box width="full" overflow={"hidden"} style={{ height: "fit-content" }} backgroundColor={"backgroundSecondary"} paddingY="8" paddingX="12">
          <Stack direction={"horizontal"} flex={1} justify={'flex-start'}>
            <Poll digest={"18"} />
            <Crowdfund maxWidth={"64"} address={"0x18f623e397EF28F1A5a094840f7F6f5587828b94"} />
          </Stack>
        </Box>

        <Box width="full" overflow={"hidden"} style={{ height: "fit-content" }} backgroundColor={"backgroundSecondary"} paddingY="8" paddingX="12">
          <Stack direction={"horizontal"} flex={1} justify={'flex-start'}>
            <Edition
              contract={'0xDF5b5ee15CC96ba7d0CB6BD9b2c0fc4417ab6445'}
              id={453}
              maxWidth={'24rem'}
            />
            <EntryEdition digest={"sfgXhqtwwMkhHLnAM1jVr16MdSJ4RGSb1Y6CAKpslgc"} />
            <Edition
              contract={'0xDF5b5ee15CC96ba7d0CB6BD9b2c0fc4417ab6445'}
              id={3347}
              maxWidth={'24rem'}
            />


            {/* <Edition
              contract={'0xDF5b5ee15CC96ba7d0CB6BD9b2c0fc4417ab6445'}
              id={453}
            /> */}

          </Stack>
        </Box>


        <Box width="full" overflow={"hidden"} style={{ height: "fit-content" }} backgroundColor={"backgroundSecondary"} paddingY="8" paddingX="12">
          <Stack direction={"horizontal"} flex={1} justify={'flex-start'}>
            <Entry digest={"tpnfq3A2rU32jVLXcHhuHc02WQ8sNm3saWvqaooerTI"} />
            <Crowdfund address={"0xCCac1187F4439E6ff02De97B16fF40BD2E7c8080"} />
            <Entry digest={"zRJ95xu0fol5Fi5Pn-vre38VYZ6nNvsYsGvBmMOSd40"} />
          </Stack>
        </Box>

        <Box width="full" overflow={"hidden"} style={{ height: "fit-content" }} backgroundColor={"backgroundSecondary"} paddingY="8" paddingX="12">
          <Stack direction={"horizontal"} flex={1} justify={'flex-start'}>
            <Crowdfund address={"0xCCac1187F4439E6ff02De97B16fF40BD2E7c8080"} />
            <Crowdfund address={"0x18f623e397EF28F1A5a094840f7F6f5587828b94"} />
            <Entry digest={"UwQwplCMEe1T5eUkp0CpTDJjZXvAK3eeakskTaQe3pE"} />
            <Crowdfund address={"0xC2e0B35582fCB19d4783738F305BCc38F53c6Ca0"} />
          </Stack>
        </Box>
      </main>

      <footer >

      </footer>
    </div>
  )
}

export default Home
