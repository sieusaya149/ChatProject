#!/bin/bash
export SOURCE_PATH="./backend"
export MODEL_PATH="${SOURCE_PATH}/models"
export SERVICE_PATH="${SOURCE_PATH}/services"
export LIB_PATH="${SOURCE_PATH}/lib"
export USER_MODEL_PATH="${SOURCE_PATH}/models/model-users"
export CHAT_MODEL_PATH="${SOURCE_PATH}/models/model-chat"
export USER_SERVICE_PATH="${SOURCE_PATH}/services/app-user"
export CHAT_SERVICE_PATH="${SOURCE_PATH}/services/app-chat"
export LIB_API_RESPONSE="${LIB_PATH}/apiResponse"
export LIB_ASYNC_CALL="${LIB_PATH}/asyncCall"
export LIB_LOGGER="${LIB_PATH}/logger"

cd ${LIB_API_RESPONSE} && rm -rf build && yarn && cd -

cd ${LIB_ASYNC_CALL} && rm -rf build && yarn && cd -

cd ${LIB_LOGGER} && rm -rf build && yarn && cd -