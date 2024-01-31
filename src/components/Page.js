import React, { useState, useEffect } from 'react';
import Wrapper from './Wrapper';
import Loading from './loading/Loading';
import Header from './header/Header';

function Page(props) {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		document.title = `${props.title} | Journey`;
		window.scrollTo(0, 0);
		setLoading(false);
	}, [props.title]);

	return <Wrapper>
		{loading ||
			<Header user={props.user} setUser={props.setUser} />}
		{loading ? <Loading></Loading> : <main>{props.children}</main>}
	</Wrapper>;
}

export default Page;
