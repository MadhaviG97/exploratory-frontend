import React from "react";
import { useStyles } from "../../assets/css/team";
import { Paper, Grid } from "@material-ui/core";
import Member from "./member";

export default function Team(props) {
  const classes = useStyles();
  function FormRow() {
    return <React.Fragment></React.Fragment>;
  }

  const details = [
    {
      id: 10001,
      first_name: "madhavi",
      last_name: "gayathri",
      university: "University of Moratuwa",
      email: "mad@123.com",
      profile_picture: "avatar-1.jpg",
    },
    {
      id: 10002,
      first_name: "malani",
      last_name: "fonseka",
      university: "University of Moratuwa",
      email: "melani@123.com",
      profile_picture: "avatar-2.jpg",
    },
    {
      id: 10003,
      first_name: "gamlath",
      last_name: "perera",
      university: "University of Moratuwa",
      email: "gamlath@123.com",
      profile_picture: "avatar-3.jpg",
    },
    {
      id: 10004,
      first_name: "peshaka",
      last_name: "dhananjaya",
      university: "University of Moratuwa",
      email: "peshaka@123.com",
      profile_picture: "avatar-4.jpg",
    },
  ];

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid container item xs={12} spacing={3}>
          {details.map((member) => {
            return (
              <Grid item xs={4}>
                <Member
                  username={member.first_name
                    .concat(" ")
                    .concat(member.first_name)}
                  university={member.university}
                  image={"/images/profile-pictures/".concat(
                    member.profile_picture
                  )}
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
}
