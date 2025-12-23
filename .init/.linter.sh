#!/bin/bash
cd /tmp/kavia/workspace/code-generation/salon-service-management-5107-5116/parlour_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

