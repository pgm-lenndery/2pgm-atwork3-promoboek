import React from 'react';
// import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import Masonry from 'react-masonry-css';
import { Container, FloatCard } from '..';
import Loader from '../Loader';
import './index.scss';

export default ({ data }) => {
    const setHovered = e => {
        const $card = e.target.closest('.floatCard');
        const $container = e.target.parentNode.closest('.container-fluid');
        
        if ($card && $container) $container.classList.add('hovering');
        else if ($container) $container.classList.remove('hovering');
    }
    
    const removeFocus = e => {
        const $container = e.target.closest('.container-fluid');
        $container.classList.remove('hovering');
    }
    
    const breakpointColumnsObj = {
        default: 3,
        1100: 2,
        800: 1,
    };
    
//     breakpointCols={breakpointColumnsObj}
//   className="my-masonry-grid"
//   columnClassName="my-masonry-grid_column"
    
    return (
        <Container 
            theme="works" 
            fluid 
            onMouseOver={e => setHovered(e)} 
            onMouseOut={e => removeFocus(e)}
        >
            {
                !data ? <Loader /> :
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="masonry"
                    columnClassName="masonry__column"
                >
                    {data.map(p => 
                        <FloatCard key={ p.id } data={p}>{ p.intro }</FloatCard>
                    )}
                </Masonry>
            }
        </Container>
    )
}