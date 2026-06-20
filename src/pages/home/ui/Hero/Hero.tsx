import { Center, Container, Divider, Flex, Stack, Text, Title } from '@mantine/core';

import classes from './Hero.module.css';

export function Hero() {
  return (
    <Container size="xl" pt={{ base: 40, sm: 60 }} pb={{ base: 30, sm: 40 }}>
      <Stack
        className={classes.hero!}
        bdrs="xl"
        pos="relative"
        pt={{ base: 60, sm: 80 }}
        pb={{ base: 40, sm: 60 }}
      >
        <Stack gap={16}>
          <Title ta="center" fw={400} fz={{ base: 28, xs: 40 }} lts="-1px">
            Extensions Registry Catalog
          </Title>

          <Center>
            <Text size="lg" ta="center" maw={575}>
              A public catalog for Extensions Registry API. Browse categories, publishers,
              extensions, and versioned releases, then download selected releases through API-issued
              presigned URLs from S3-compatible storage.
            </Text>
          </Center>
        </Stack>
        <Center>
          <Flex gap={10} align="center">
            <Text size="lg" component="span">
              SemVer
            </Text>
            <Divider className={classes.featureDivider!} orientation="vertical" />
            <Text size="lg" component="span">
              Presigned URLs
            </Text>
            <Divider className={classes.featureDivider!} orientation="vertical" />
            <Text size="lg" component="span">
              Changelog
            </Text>
          </Flex>
        </Center>
      </Stack>
    </Container>
  );
}
