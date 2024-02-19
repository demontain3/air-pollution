"use client"

import { motion } from 'framer-motion';
import BlogWrapper from '@/components/BlogWrapper';
import React from 'react';
import { SignIn } from '@/components/Signin';

const page = () => {
  const animationVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const animationTransition = {
    type: 'spring',
    stiffness: 260,
    damping: 20,
    duration: 1,
  };

  return (
    <>
      <BlogWrapper>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={animationVariants}
          transition={animationTransition}
        >
          <SignIn />
        </motion.div>
      </BlogWrapper>
    </>
  );
};

export default page;
