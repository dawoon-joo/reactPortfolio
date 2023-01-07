import Layout from '../common/Layout';
import { useEffect, useRef, useState } from 'react';

function Location() {
	const [Traffic, setTraffic] = useState(false);
	const mapInstance = useRef(null);
	const container = useRef(null);
	const { kakao } = window;
	const options = {
		center: new kakao.maps.LatLng(33.450701, 126.570667),
		level: 3,
	};

	//marker
	const imageSrc = `${process.env.PUBLIC_URL}/img/marker1.png`;
	const imageSize = new kakao.maps.Size(232, 99);
	const imageOption = { offset: new kakao.maps.Point(116, 99) };

	const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

	const marker = new kakao.maps.Marker({
		position: options.center,
		image: markerImage,
	});

	useEffect(() => {
		mapInstance.current = new kakao.maps.Map(container.current, options);
		marker.setMap(mapInstance.current);
	}, []);

	useEffect(() => {
		Traffic
			? mapInstance.current?.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
			: mapInstance.current?.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}, [Traffic]);

	return (
		<Layout name={'Location'}>
			<div id='map' ref={container}></div>
			<button onClick={() => setTraffic(!Traffic)}>{Traffic ? 'Traffic ON' : 'Traffic OFF'}</button>
		</Layout>
	);
}

export default Location;
