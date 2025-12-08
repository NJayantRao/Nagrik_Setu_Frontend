import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { width } from '@mui/system';

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

// function stringAvatar(name) {
//   return {
//     sx: {
//       bgcolor: stringToColor(name),
//     //   letterSpacing: "2px",   // <-- increase spacing here
//       height:"40",
//       width:"40",
//     },
//     children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
//   };
// }

// function stringAvatar(name = "") {
//   const parts = name.trim().split(" ");

//   let initials = "";
//   if (parts.length === 1) {
//     initials = parts[0][0] || "";
//   } else if (parts.length >= 2) {
//     initials = `${parts[0][0]}${parts[1][0]}`;
//   }
// }


function stringAvatar(name = "") {
  const clean = name.trim().split(" ").filter(Boolean); // Removes empty strings

  let initials = "";

  if (clean.length === 1) {
    initials = clean[0][0]; 
  } else if (clean.length >= 2) {
    initials = clean[0][0] + clean[1][0];
  }

  return {
    sx: {
      bgcolor: stringToColor(name),
      height: "40px",
      width: "40px",
      fontSize: "18px",
      fontWeight: "600",
    },
    children: initials.toUpperCase(),
  };
}

export default function BackgroundLetterAvatars(props) {
  return (
    <Stack direction="row" spacing={5}>
      <Avatar {...stringAvatar(props.string)} />
    </Stack>
  );
}
