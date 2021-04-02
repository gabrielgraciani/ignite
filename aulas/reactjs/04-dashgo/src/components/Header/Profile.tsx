import { Flex, Text, Box, Avatar } from '@chakra-ui/react';

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData }: ProfileProps): JSX.Element {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Gabriel Graciani</Text>
          <Text color="gray.300" fontSize="small">
            gabrieltgraciani@hotmail.com
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="Gabriel Graciani"
        src="https://github.com/gabrielgraciani.png"
      />
    </Flex>
  );
}
