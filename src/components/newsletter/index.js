import React from 'react';

import { Container } from './styled';

const Newsletter = () => (
    <Container>
        <h4>Receive my latest posts, straight to your inbox.</h4>
        I'll send you an email once or twice a month. No spam!
        <form
            action="https://buttondown.email/api/emails/embed-subscribe/emgoto"
            method="post"
            target="popupwindow"
            onSubmit={() =>
                window.open(
                    'https://buttondown.email/emgoto',
                    'popupwindow',
                )
            }
        >
            <label htmlFor="bd-email">Enter your email</label>
            <input
                type="email"
                name="email"
                id="bd-email"
                placeholder="your@email.com"
            ></input>
            <input type="hidden" value="1" name="embed"></input>
            <input type="submit" value="Subscribe"></input>
        </form>
    </Container>
);

export default Newsletter;
