
"use client"



import { Avatar, Group, Text, UnstyledButton } from "@mantine/core";

import styles from '@/app/_styles/elements/userButton.module.scss'


export default function UserButton() {



    return (
        <UnstyledButton className={styles.user}>
      <Group>
        <Avatar
          src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
          radius="xl"
        />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            Harriette Spoonlicker
          </Text>

          <Text c="dimmed" size="xs">
            hspoonlicker@outlook.com
          </Text>
        </div>

       
      </Group>
    </UnstyledButton>
    )
}


