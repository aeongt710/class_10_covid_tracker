import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';

function InfoBox({title,cases,total}) {
    return (
        <Card className="infoBox">
            <CardContent>
                <Typography color="textSecondary"  className="infoBox_title">
                    {title}
                </Typography>
                <h2  className="infoBox_cases">{cases}</h2>
                <Typography color="textSecondary"  className="infoBox_total">{total}</Typography>
            </CardContent>
        </Card>
    );
}

export default InfoBox;