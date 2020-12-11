import React from 'react';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import { Container, FloatCard } from '..';
import './index.scss';

export default () => {
    const setHovered = (e) => {
        const $card = e.target.closest('.floatCard');
        const $container = e.target.parentNode.closest('.container-fluid');
        
        if ($card && $container) $container.classList.add('hovering')
        else if ($container) $container.classList.remove('hovering')
    }
    
    return (
        <Container theme="works" fluid onMouseOver={e => setHovered(e)}>
            <ResponsiveMasonry columnsCountBreakPoints={{750: 2, 900: 3}}>
                <Masonry gutter={'4rem'}> 
                    <FloatCard title="Tronald Dump">Leren omgaan met XMLHttpRequests</FloatCard>
                    <FloatCard title="Tronald Dump">Leren omgaan met XMLHttpRequests</FloatCard>
                    <FloatCard title="Tronald Dump">Leren omgaan met XMLHttpRequests</FloatCard>
                    <FloatCard title="Tronald Dump">Leren omgaan met XMLHttpRequests</FloatCard>
                    <FloatCard title="Tronald Dump">Leren omgaan met XMLHttpRequests</FloatCard>
                    <FloatCard title="Tronald Dump">Leren omgaan met XMLHttpRequests</FloatCard>
                    <FloatCard title="Tronald Dump">Leren omgaan met XMLHttpRequests</FloatCard>
                    <FloatCard title="Tronald Dump">Leren omgaan met XMLHttpRequests</FloatCard>
                    <FloatCard title="Tronald Dump">Leren omgaan met XMLHttpRequests</FloatCard>
                    <FloatCard title="Tronald Dump">Leren omgaan met XMLHttpRequests</FloatCard>
                </Masonry>
            </ResponsiveMasonry>
        </Container>
    )
}