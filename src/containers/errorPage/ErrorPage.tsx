import React from 'react';
import { Typography } from '@material-ui/core';
import styles from './ErrorPage.module.scss';

const ErrorCode: React.FC = () => (
        <Typography
            variant="h1"
            className={styles.errorCode}
        >
            404
        </Typography>
);

const ErrorText: React.FC = () => (
        <Typography
            variant="h3"
            className={styles.errorText}
        >
            Something went wrong...
        </Typography>
);

const ErrorPage: React.FC = () => (
        <div className={styles.errorPageContainer}>
            <ErrorCode />
            <ErrorText />
        </div>
);

export default ErrorPage;
