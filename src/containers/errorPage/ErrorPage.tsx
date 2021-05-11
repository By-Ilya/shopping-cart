import React from 'react';
import { Typography } from '@material-ui/core';
import styles from './ErrorPage.module.scss';

interface ErrorPageProps {
  code: number,
  message: string
}

interface ErrorCodeProps {
  code: number
}

interface ErrorMessageProps {
  message: string
}

const ErrorCode: React.FC<ErrorCodeProps> = ({ code }) => (
        <Typography
            variant="h1"
            className={styles.errorCode}
        >
            {code}
        </Typography>
);

const ErrorText: React.FC<ErrorMessageProps> = ({ message }) => (
        <Typography
            variant="h3"
            className={styles.errorText}
        >
            {message}
        </Typography>
);

const ErrorPage: React.FC<ErrorPageProps> = ({ code, message }) => (
        <div className={styles.errorPageContainer}>
            <ErrorCode code={code} />
            <ErrorText message={message} />
        </div>
);

export default ErrorPage;
