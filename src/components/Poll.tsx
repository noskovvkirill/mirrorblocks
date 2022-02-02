import thunder from '../fetcher'
import useSWR from 'swr'
import Root from './Root'
import { Box, AvatarGroup, Heading, Skeleton, IconCheck, Stat, Tag, Text, Stack } from 'degen'
import AddressPrettyPrint from '../helpers/AddressPrettyPrint'


const fetcher = (id: string) => {
    return thunder('query')({
        mirrorPoll: [{
            id: Number(id)
        }, {
            title: true,
            description: true,
            prompt: true,
            status: true,
            endsAt: true,
            startsAt: true,
            coverImage: {
                mimetype: true,
                url: true
            },
            choices: {
                id: true,
                title: true,
                description: true,
                responses: {
                    address: true,
                    twitter: {
                        avatarURL: true,
                    }
                }
            }
        },
        ],
    }
    )
}


const Poll = ({ digest = "18", maxWidth }: { digest: string, maxWidth?: string }): JSX.Element => {
    const { data, error, isValidating } = useSWR(digest, fetcher, {
        revalidateOnFocus: false
    });
    return (
        <Root maxWidth={maxWidth}>
            <Box display="flex"
                position={"relative"}
                borderRadius={"3xLarge"}
                width="full" flexDirection="column" style={{ maxWidth: "36rem" }} gap="4" backgroundColor={"background"}>
                {/* <a style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
                    href={
                        data?.entry?.publisher?.project?.domain
                            ? 'https://' + data?.entry?.publisher?.project?.domain + '/' + digest
                            : 'https://' + 'mirror.xyz/' + data?.entry?.publisher?.member?.ens + digest
                    }
                    target={"_blank"}
                /> */}
                <Box width="full" paddingTop={"6"} paddingBottom={"6"} gap={"6"} display="flex" style={{ flex: '1 1' }}
                    flexDirection="column" justifyContent={"space-between"}>
                    <Box width="full" as='header' marginBottom="auto" paddingLeft={"6"} paddingRight={"6"}>

                        <Stack space={"4"}>

                            <Skeleton loading={isValidating || error}>
                                <Stat
                                    size="small"
                                    label="POLL"
                                    value={data?.mirrorPoll?.title}
                                />
                            </Skeleton>
                            <Skeleton loading={isValidating || error}>
                                <Box style={{
                                    overflow: 'hidden',
                                    WebkitLineClamp: '5',
                                    lineClamp: '5',
                                    display: '-webkit-box',
                                    WebkitBoxOrient: 'vertical',
                                }}>
                                    <Text
                                        size='small'
                                        color="textTertiary" weight={"normal"}>
                                        {data?.mirrorPoll?.description}
                                    </Text>
                                </Box>
                            </Skeleton>

                            <Stack direction={"horizontal"}>
                                <Box width="full">
                                    <Skeleton loading={isValidating || error}>
                                        <Stat
                                            size="small"
                                            label="VOTING STATUS"
                                            value={data?.mirrorPoll?.status && data.mirrorPoll.status.slice(0, 1) + data.mirrorPoll.status.slice(1, data.mirrorPoll.status.length).toLowerCase()}
                                            meta={
                                                data?.mirrorPoll?.status === 'ENDED'
                                                    ? 'Voting has ended'
                                                    : data?.mirrorPoll?.status === 'DELETED'
                                                        ? 'Voting canceled'
                                                        : data?.mirrorPoll?.status === 'CREATED'
                                                            ? "Voting hasn't started yet"
                                                            : 'Voting in progress'
                                            }
                                        />
                                    </Skeleton>
                                </Box>


                                <Box width="full">
                                    <Skeleton loading={isValidating || error}>
                                        <Stat
                                            size="small"
                                            label={
                                                data?.mirrorPoll?.status === 'ENDED'
                                                    ? 'Voting ended'
                                                    : data?.mirrorPoll?.status === 'LIVE'
                                                        ? 'Voting ends'
                                                        : data?.mirrorPoll?.status === 'CREATED' ? 'Voting starts'
                                                            : 'Voting ends'
                                            }
                                            value={(data?.mirrorPoll?.status === 'ENDED' || data?.mirrorPoll?.status === 'LIVE')
                                                ? data?.mirrorPoll?.endsAt && new Date(Date.parse(data?.mirrorPoll?.endsAt)).toLocaleString([], {
                                                    day: 'numeric', year: 'numeric', month: 'long'
                                                })
                                                : data?.mirrorPoll?.startsAt && new Date(Date.parse(data?.mirrorPoll?.startsAt)).toLocaleString([], {
                                                    day: 'numeric', year: 'numeric', month: 'long'
                                                })
                                            }
                                            meta={(data?.mirrorPoll?.status === 'ENDED' || data?.mirrorPoll?.status === 'LIVE')
                                                ? data?.mirrorPoll?.endsAt && new Date(Date.parse(data?.mirrorPoll?.endsAt)).toLocaleString([], {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })
                                                : data?.mirrorPoll?.startsAt && new Date(Date.parse(data?.mirrorPoll?.startsAt)).toLocaleString([], {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })
                                            }
                                        />
                                    </Skeleton>
                                </Box>
                            </Stack>

                            <Stack space="6">
                                <Box flexShrink={0} paddingBottom={"2"}></Box>
                                {data?.mirrorPoll?.choices?.sort((a, b) => Number(b?.responses?.length) - Number(a?.responses?.length))
                                    .map((choice, index) => {
                                        return (
                                            <Box>
                                                <Stack space="4">
                                                    <Stack direction="horizontal" space="2">
                                                        <Stack>
                                                            <Stack direction='horizontal'>
                                                                {index === 0 && (
                                                                    <IconCheck color={'green'} />
                                                                )}
                                                                <Text
                                                                    size='large'
                                                                    color={index === 0 ? 'green' : 'inherit'}
                                                                >{choice.title}
                                                                </Text>
                                                            </Stack>
                                                            <Text size='small' color='textTertiary'>{choice.description}</Text>
                                                        </Stack>
                                                        <Box backgroundColor='backgroundSecondary'
                                                            borderRadius={"large"}
                                                            height="fit"
                                                            aspectRatio='1/1'
                                                            paddingY="3"
                                                            paddingX="4"
                                                        >
                                                            <Text size='large' color={index === 0 ? 'green' : 'textSecondary'}>{Number(choice?.responses?.length)}</Text>
                                                        </Box>
                                                    </Stack>
                                                    <AvatarGroup
                                                        members={choice.responses?.map((response) => ({ label: response.address || 'poll participant', src: response?.twitter?.avatarURL })) || []}
                                                    />
                                                </Stack>
                                            </Box>
                                        )
                                    })}
                            </Stack>


                        </Stack>
                    </Box>

                </Box>

            </Box>

            {/* <Box paddingLeft={"6"} paddingRight={"6"}>
                        <SkeletonGroup loading={isValidating || error}>
                            <Stack direction={"horizontal"} space={"2"} align={"center"}>
                                <Skeleton>
                                    <Avatar
                                        size="6"
                                        label={data?.entry?.publisher?.project?.displayName || 'avatar'}
                                        src={data?.entry?.publisher?.project?.avatarURL} />
                                </Skeleton>
                                <Skeleton>
                                    <Text
                                        weight={"semiBold"}
                                        color='textSecondary'>{data?.entry?.publisher?.project?.displayName}</Text>
                                </Skeleton>
                                <Skeleton>
                                    <Tag>{AddressPrettyPrint(data?.entry?.publisher?.project?.address || "0x", 6)}</Tag>
                                </Skeleton>
                            </Stack>
                        </SkeletonGroup>
                    </Box> */}



        </Root>
    )
};

export default Poll;