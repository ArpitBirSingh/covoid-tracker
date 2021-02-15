import React from 'react';
import { Card, CardContent , Typography } from "@material-ui/core";
import "./InfoBox.css";

function InfoBox( {title, cases, isRed, total, active, ...props} ) 
{
    return (
        <Card onClick={props.onclick} className={`infoBox ${active && "infoBox--selected"} ${isRed && "infoBox--red"}`}>
            <CardContent>
                <Typography color="textSecondary" className="infoBox__title">  {title}   </Typography>
                <h2 className = {`infoBox__cases ${!isRed && "infoBox__cases--green"}` }>  Today   {cases}  </h2>
                <Typography color="textSecondary" className="infoBox__total">  Total  {total}    </Typography>          
            </CardContent>
        </Card>
    )
}

export default InfoBox;