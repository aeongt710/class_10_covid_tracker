import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import NumberFormat from 'react-number-format';
function InfoBox({title,cases,total}) {
    return (
        <Card className="infoBox">
            <CardContent>
                <Typography color="textSecondary"  className="infoBox_title">
                    {title}
                </Typography>
                
                <h2  className="infoBox_cases"><NumberFormat value={cases} displayType={'text'} thousandSeparator={true} prefix={''} /></h2>
                <Typography color="textSecondary"  className="infoBox_total"><NumberFormat value={total} displayType={'text'} thousandSeparator={true} prefix={''} /></Typography>
            </CardContent>
        </Card>
    );
}

export default InfoBox;