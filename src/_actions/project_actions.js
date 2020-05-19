import axios from "axios";
import {
  SEARCH,
  RENDER,
  COMMENTS,
  REPLIES,
  RELATEDIMAGES,
  FINALPAPER,
  PUBLICFILES,
} from "./types";

export function search(dataToSubmit) {
  const request = axios
    .post(`/search`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: SEARCH,
    payload: request,
  };
}

export function render(request) {
  return {
    type: RENDER,
    payload: request,
  };
}

export function getComments(request) {
  return {
    type: COMMENTS,
    payload: request,
  };
}

export function getReplies(request) {
  return {
    type: REPLIES,
    payload: request,
  };
}

export function getRelatedImages(request) {
  return {
    type: RELATEDIMAGES,
    payload: request,
  };
}

export function getFinalPaper(request) {
  return {
    type: FINALPAPER,
    payload: request,
  };
}

export function getPublicFiles(request) {
  return {
    type: PUBLICFILES,
    payload: request,
  };
}
