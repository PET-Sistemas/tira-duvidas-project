#!/bin/bash

# Save terminal state
save_terminal_state() {
  tput smcup # Save current screen content and switch to alternate screen
  tput civis # Hide the cursor
}

# Restore terminal state
restore_terminal_state() {
  tput rmcup # Restore saved screen content and switch back to main screen
  tput cvvis # Show the cursor
}

# Example usage
save_terminal_state

# Perform actions that modify the terminal, e.g., printing output or running commands
ip -a

sleep 5
clear
echo "This will be cleared too."
sleep 2

restore_terminal_state

echo "Terminal state restored!"

exit 0
