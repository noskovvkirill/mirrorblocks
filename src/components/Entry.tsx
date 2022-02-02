import thunder from '../fetcher'
import useSWR from 'swr'
import Root from '../components/Root'
import { render } from '../helpers/MarkdownSimpleParser'
import { Box, Heading, Skeleton, SkeletonGroup, Stat, Tag, Text, Stack, Avatar } from 'degen'
import AddressPrettyPrint from '../helpers/AddressPrettyPrint'
import { getFirstImage } from '../helpers/MarkdownUtils'

const fetcher = (digest: string) => {
    return thunder('query')({
        entry: [{
            digest: digest
        }, {
            body: true,
            title: true,
            entryId: true,
            publishedAtTimestamp: true,
            canonicalUrl: true,
            featuredImage: {
                mimetype: true,
                url: true
            },
            publisher: {
                project: {
                    address: true,
                    displayName: true,
                    avatarURL: true,
                    domain: true,
                    ens: true,
                    theme: {
                        accent: true
                    }
                },
                member: {
                    address: true,
                    ens: true,
                    displayName: true,
                    avatarURL: true,
                    domain: true

                }
            },
        },
        ],
    }
    )
}


const Entry = ({ digest, maxWidth }: { digest: string, maxWidth?: string }): JSX.Element => {
    const { data, error, isValidating } = useSWR(digest, fetcher, {
        revalidateOnFocus: false
    });
    return (
        <Root maxWidth={maxWidth}>
            <Box display="flex"
                position={"relative"}
                borderRadius={"3xLarge"}
                width="full" flexDirection="column" style={{ maxWidth: "36rem" }} gap="4" backgroundColor={"background"}>
                <a style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
                    href={
                        data?.entry?.publisher?.project?.domain
                            ? 'https://' + data?.entry?.publisher?.project?.domain + '/' + digest
                            : 'https://' + 'mirror.xyz/' + data?.entry?.publisher?.member?.ens + digest
                    }
                    target={"_blank"}
                />
                <Box
                    aspectRatio="2/1"
                    overflow='hidden'
                    width="full"
                    backgroundColor={"foregroundSecondary"}
                    borderColor={'transparent'}
                    borderTopLeftRadius="3xLarge"
                    borderTopRightRadius={"3xLarge"}
                    position={"relative"}>
                    {data?.entry?.featuredImage?.url
                        ? <img
                            style={{ userSelect: 'none', objectFit: 'cover', width: '100%', height: '100%' }}
                            src={data?.entry?.featuredImage?.url} />
                        : data?.entry?.body && getFirstImage(data?.entry?.body)
                            ? <img
                                style={{ userSelect: 'none', objectFit: 'cover', width: '100%', height: '100%' }}
                                src={getFirstImage(data?.entry?.body) || ''} />
                            : <Box width="full" height="full"
                                style={{ minHeight: '100%', userSelect: 'none' }}
                                display="flex"
                                alignItems={"center"}
                                justifyContent={"center"}
                                // @ts-ignore
                                backgroundColor={data?.entry?.publisher?.project?.theme?.accent?.toLowerCase() || "foregroundSecondary"}
                            >
                                <Heading>{data?.entry?.title}</Heading>
                            </Box>
                    }
                </Box>


                <Box width="full" paddingTop={"0"} paddingBottom={"6"} gap={"6"} display="flex" style={{ flex: '1 1' }}
                    flexDirection="column" justifyContent={"space-between"}>
                    <Box width="full" as='header' marginBottom="auto" paddingLeft={"6"} paddingRight={"6"}>
                        <Stack space={"4"}>
                            <Skeleton loading={isValidating || error}>
                                <Stat
                                    size="small"
                                    label="ENTRY"
                                    value={data?.entry?.title}
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
                                        {data?.entry?.body && render(data?.entry?.body, false, false, true).trim().replace(/<(.|\n)*?>/g, '').split("\n").filter(v => v).join("\n")}
                                    </Text>
                                </Box>
                            </Skeleton>
                        </Stack>
                    </Box>

                    <Box paddingLeft={"6"} paddingRight={"6"}>
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
                    </Box>

                </Box>
            </Box>
        </Root>
    )
};

export default Entry;