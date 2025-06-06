#!/bin/bash
cd /home/kavia/workspace/code-generation/streamsphere-34610-bdd5f0e1/streamsphere
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

