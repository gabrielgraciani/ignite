import { Flex, Text, Box, Avatar } from '@chakra-ui/react';

export function Profile(): JSX.Element {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Gabriel Graciani</Text>
        <Text color="gray.300" fontSize="small">
          gabrieltgraciani@hotmail.com
        </Text>
      </Box>

      <Avatar
        size="md"
        name="Gabriel Graciani"
        src="https://github.com/gabrielgraciani.png"
      />
    </Flex>
  );
}
