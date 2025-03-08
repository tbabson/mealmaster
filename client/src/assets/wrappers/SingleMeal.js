import styled from "styled-components";


const Wrapper = styled.div`

section{
    width: 100%;
    margin: 0 auto;
    margin-top: 1rem;
    margin-bottom: 3rem;
}

.singleMeal{
    
    width: 90%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr;
}

.mealInfoContainer{
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;

    @media (max-width: 768px){
        grid-template-columns: 1fr;
    }

    @media (min-width: 768px){
        grid-template-columns: 1fr 2fr;
    }

    @media (min-width: 1024px){
        grid-template-columns: 1fr 2fr;
    }
    
}

.mealImage{
    img{
        width: 100%;
        height: auto;
        border-radius: 10px;
    }
}

.mealDetail{
    h1{
        font-size: 2rem;
        margin-bottom: 1rem;
        line-height: 1.5;
        color: var(--darkest);
        font-weight: 600;
    }

    .mealAndCountry{
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
        p{
            font-size: 1rem;
            color: var(--dark);
        }
    }

    .icon{
        margin-right: 0.5rem;
        color: var(--secondary);
    }

    .averageRating{
        .spanRating{
            display: flex;
            justify-content: space-between;
            p{
                font-size: 1rem;
                color: var(--dark);
            }

            span{
                p{
                    font-size: 1rem;
                    color: var(--dark);
                }
            }
        }
    }

    .divider{
        border: 1px solid var(--light);
        margin: 1rem 0;
        max-width: 100%;
    }

    .ingredients{
        h3{
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: var(--darkest);
            font-weight: 500;
            text-transform: capitalize;
        }

        ol {
            list-style: none; 
            padding: 0; 
            margin: 0; 

        li {
            margin-bottom: 1rem; /* Add space between list items */

            strong {
            color: var(--dark); /* Set color for ingredient name */
            text-transform: capitalize; /* Capitalize the text */
            }

            /* Style for quantity, unit, and price */
            .quantity,
            .unit,
            .price {
            color: var(--dark); /* Use a lighter color for these details */
            font-size: 0.9rem; /* Slightly smaller font size */
            }

            .price {
            font-weight: 500; /* Make the price bold */
            }

            /* Style for substitutions */
            .substitutions {
            color: var(--secondary); 
            font-style: italic; 
            font-size: 0.8rem; 
            line-height: 1.5;

            /* &::before {
                content: " | "; 
                color: var(--gray); 
            } */
            }
        }
        }

        p {
            color: var(--dark);
            font-size: 1rem; 
        }
    }

    .howTo{
        h3{
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: var(--darkest);
            font-weight: 500;
            text-transform: capitalize;
        }

        .preparation-guide{
            p{
                color: var(--dark);
                font-size: 1rem;
                margin-bottom: 1rem;
                line-height: 1.5;
            }

            strong{
                color: var(--dark);
                font-size: 1rem;
                font-weight: 600;
            }

            ol{
                list-style: none;
                padding: 0;
                margin: 0;

                li{
                    margin-bottom: 1rem;
                    color: var(--dark);
                    font-size: 1rem;
                    line-height: 1.5;

                    strong{
                        color: var(--dark);
                        font-size: 1rem;
                        font-weight: 600;
                    }

                    .instruction{
                        color: var(--dark);
                        font-size: 1rem;
                    }
                }
            }
        }

        p{
            color: var(--dark);
            font-size: 1rem;
        }
    }

    .buttons{
            margin-top: 2rem;
            margin-bottom: 2rem;

            .btn-primary{
                margin-right: 2rem;
            }        
    }

    .reviews{
        h3{
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: var(--darkest);
            font-weight: 500;
            text-transform: capitalize;
        }

        .review{
            margin-bottom: 1rem;
            padding: 1rem;
            border: 1.5px solid var(--light);
            border-radius: 10px;

        h4{
            color: var(--dark);
            font-size: 1rem;
            margin-bottom: 1rem;
            text-transform: capitalize;
        }

            h5{
                color: var(--secondary);
                font-size: 1rem;
                margin-bottom: 1rem
            }

            p{
                color: var(--dark);
                font-size: 1rem;
                margin-bottom: 1rem;
                line-height: 1.5;
            }

            strong{
                color: var(--dark);
                font-size: 1rem;
                font-weight: 600;
            }

            .rating{
                color: var(--dark);
                font-size: 1rem;
            }
        }

        p{
            color: var(--dark);
            font-size: 1rem;
        }
    }
}
`

export default Wrapper