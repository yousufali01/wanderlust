import React from 'react';
import Image from 'next/image';
const DestinationDetailsPage = async({params}) => {
    const {id} = await params;

    const res = await fetch(`http://localhost:8000/destination/${id}`)
    const destination  = await res.json();


    return (
        <div>
            <div>
                <Image src = {destination.imageUr} alt = "" height={400} width={400}/>
            </div>
        </div>
    );
};

export default DestinationDetailsPage;