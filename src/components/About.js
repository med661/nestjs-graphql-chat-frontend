import React from 'react';
import {
    Box,
    Heading,
    Text,
    Link,
    List,
    ListItem,
} from '@chakra-ui/react';

const AboutMe = () => {
    return (
        <Box p={8} maxW="600px" mx="auto" boxShadow="lg" borderRadius="lg" bg="gray.100" overflow="hidden">
            <Heading as="h1" mb={4} fontSize="3xl" textAlign="center" color="teal.500">
                Mohamed Salah Sfar Chaabane
            </Heading>
            <Text textAlign="center" fontSize="lg" color="gray.600">
                <Link href="mailto:mohamedsalah.sfarchaabane@polytechnicien.tn" color="teal.500" fontWeight="bold">
                    mohamedsalah.sfarchaabane@polytechnicien.tn
                </Link>{' '}
                | <Link href="tel:+21658962808" color="teal.500" fontWeight="bold">+216 58962808</Link> | Mahdia, Tunisia
            </Text>
            <Box mt={4} textAlign="center">
                <Link href="https://github.com/med661" isExternal color="teal.500" fontWeight="bold">
                    github.com/med661
                </Link>{' '}
                |{' '}
                <Link href="https://www.linkedin.com/in/mohamed-salah-sfar-chaabane/" isExternal color="teal.500" fontWeight="bold">
                    linkedin.com/in/mohamed-salah-sfar-chaabane
                </Link>
            </Box>

            {/* EDUCATION SECTION */}
            <Box mt={8} textAlign="center">
                <Heading as="h2" mb={4} fontSize="xl" color="teal.500">
                    Education
                </Heading>
                <Text fontSize="md" color="gray.700">
                    Bachelor’s degree in Computer Engineering<br />
                    <Text as="span" fontWeight="bold" color="teal.500">Polytechnic School of Sousse</Text><br />
                    September 2019 – June 2022
                </Text>
                <Text mt={2} fontSize="md" color="gray.700">
                    Integrated preparatory cycle<br />
                    <Text as="span" fontWeight="bold" color="teal.500">Polytechnic School of Sousse</Text><br />
                    September 2017 – June 2019
                </Text>
            </Box>

            {/* SKILLS SECTION */}
            {/* ... (unchanged) */}

            {/* STRENGTHS SECTION */}
            {/* ... (unchanged) */}
        </Box>
    );
};

export default AboutMe;
