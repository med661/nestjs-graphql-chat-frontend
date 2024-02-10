import React from 'react';
import {
    Box,
    Heading,
    Text,
    Link,
} from '@chakra-ui/react';

const AboutMe = () => {
    return (
        <Box p={8} maxW="600px" mx="auto" boxShadow="lg" borderRadius="lg" bg="white" overflow="hidden">
            <Heading as="h1" mb={4} fontSize="3xl" textAlign="center" color="blue.600">
                Mohamed Salah Sfar Chaabane
            </Heading>
            <Text textAlign="center" fontSize="lg" color="gray.600"> 

                full stack web developer
            </Text>

            <Text textAlign="center" fontSize="lg" color="gray.600">
                <Link href="mailto:mohamedsalah.sfarchaabane@polytechnicien.tn" color="blue.600" fontWeight="bold">
                    mohamedsalah.sfarchaabane@polytechnicien.tn
                </Link><span>&nbsp;&nbsp;</span>
                <br />
                | <Link href="tel:+21658962808" color="blue.600" fontWeight="bold">+216 58962808</Link> | Mahdia, Tunisia
            </Text>
            <Box mt={4} textAlign="center">
                <Link href="https://github.com/med661" isExternal color="blue.600" fontWeight="bold">
                    github.com/med661
                </Link>{' '}
                |{' '}
                <Link href="https://www.linkedin.com/in/mohamed-salah-sfar-chaabane/" isExternal color="blue.600" fontWeight="bold">
                    linkedin.com/in/mohamed-salah-sfar-chaabane
                </Link>
            </Box>

            {/* EDUCATION SECTION */}
            <Box mt={8} textAlign="left">
                <Heading as="h2" mb={4} fontSize="xl" color="blue.600">
                    Education
                </Heading>
                <Text fontSize="md" color="gray.700">
                    Bachelor’s degree in Computer Engineering<br />
                    <Text as="span" fontWeight="bold" color="blue.600">Polytechnic School of Sousse</Text><br />
                    September 2019 – June 2022
                </Text>
                <Text mt={2} fontSize="md" color="gray.700">
                    Integrated preparatory cycle<br />
                    <Text as="span" fontWeight="bold" color="blue.600">Polytechnic School of Sousse</Text><br />
                    September 2017 – June 2019
                </Text>
            </Box>

            {/* LOGIN AND REGISTER LINKS */}
            <Box mt={8} textAlign="center">
                <Text fontSize="lg" color="gray.700">
                    For more information, you can <Link href="/login" color="blue.600" fontWeight="bold">login</Link> or <Link href="/register" color="blue.600" fontWeight="bold">register</Link>.
                </Text>
            </Box>
        </Box>
    );
};

export default AboutMe;
