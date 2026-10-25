/**
 * PRECOMPUTED DEMONSTRATION DATA
 * Research Pipeline Simulation — Team 54
 * Amrita Vishwa Vidyapeetham · School of Computing
 *
 * This file contains representative data for the simulation.
 * Only the VERIFIED_METRICS section contains actual research results.
 * All other data is precomputed/illustrative simulation output.
 */

export const DEMO_FILE_METADATA = {
  name: 'ML_Lecture_DeepLearning_Intro.mp4',
  size: '284 MB',
  duration: '9:30',
  durationSec: 570,
  format: 'MP4 (H.264)',
  isDemo: true,
};

export const DEMO_TRANSCRIPT = [
  { id: 1, start: '00:00', end: '00:32', startSec: 0, endSec: 32, text: 'Today we will introduce the foundational concepts behind artificial neural networks. These systems are loosely inspired by the biological neural networks found in the human brain.' },
  { id: 2, start: '00:32', end: '01:13', startSec: 32, endSec: 73, text: 'A neural network consists of layers of interconnected nodes called neurons. Each connection has an associated weight that is updated during training to minimize the prediction error of the model.' },
  { id: 3, start: '01:13', end: '01:47', startSec: 73, endSec: 107, text: 'Gradient descent is an iterative optimization algorithm used to minimize the loss function. We compute the gradient of the loss with respect to each model parameter, then move in the opposite direction.' },
  { id: 4, start: '01:47', end: '02:47', startSec: 107, endSec: 167, text: 'The learning rate is a critical hyperparameter that controls the step size during parameter updates. A learning rate that is too large causes divergence, while one that is too small leads to very slow convergence.' },
  { id: 5, start: '02:47', end: '03:22', startSec: 167, endSec: 202, text: 'Backpropagation is the algorithm used to compute gradients efficiently through a neural network. It applies the chain rule of calculus to propagate error signals backward from the output layer to the input layer.' },
  { id: 6, start: '03:22', end: '04:01', startSec: 202, endSec: 241, text: 'The chain rule states that the derivative of a composite function is the product of the derivatives of its component functions. This allows us to determine how each individual weight contributes to the final loss.' },
  { id: 7, start: '04:01', end: '04:31', startSec: 241, endSec: 271, text: 'During the forward pass, input data is propagated through each layer, applying the weight matrix and activation function at each step to produce a final prediction or output vector.' },
  { id: 8, start: '04:31', end: '05:09', startSec: 271, endSec: 309, text: 'Activation functions introduce non-linearity into the network, enabling it to learn complex relationships between inputs and outputs. Without activation functions, the entire network would collapse to a single linear transformation.' },
  { id: 9, start: '05:09', end: '06:02', startSec: 309, endSec: 362, text: 'The three most commonly used activation functions are ReLU, which outputs zero for negative inputs and is linear for positive; sigmoid, which squashes values to the range zero to one; and tanh, which maps inputs to negative one to one.' },
  { id: 10, start: '06:02', end: '06:38', startSec: 362, endSec: 398, text: 'Regularization is a collection of techniques used to prevent overfitting. Overfitting occurs when the model learns noise in the training data rather than the underlying distribution, causing poor performance on unseen data.' },
  { id: 11, start: '06:38', end: '07:15', startSec: 398, endSec: 435, text: 'Dropout is a powerful regularization method in which randomly selected neurons are set to zero during each training step. This forces the network to learn redundant representations and prevents co-adaptation of neurons.' },
  { id: 12, start: '07:15', end: '07:45', startSec: 435, endSec: 465, text: 'L2 regularization, also known as weight decay, adds a penalty term proportional to the squared magnitude of the weights to the loss function. This discourages the model from relying on any single feature.' },
  { id: 13, start: '07:45', end: '08:20', startSec: 465, endSec: 500, text: 'Batch normalization normalizes the activations of each layer to have zero mean and unit variance within each mini-batch. This reduces internal covariate shift and allows higher learning rates to be used.' },
  { id: 14, start: '08:20', end: '08:55', startSec: 500, endSec: 535, text: 'Convolutional Neural Networks are a specialized architecture designed for processing structured grid data such as images. They use convolutional layers that apply learnable filters across spatial positions to detect local patterns.' },
  { id: 15, start: '08:55', end: '09:30', startSec: 535, endSec: 570, text: 'A convolution operation applies a small learnable filter, also called a kernel, across the spatial dimensions of the input. Each filter learns to detect a specific local feature such as edges, textures, or higher-level structural patterns.' },
];

export const DEMO_BOUNDARIES = [
  { sentenceId: 1, label: 0, conf: 0.12 },
  { sentenceId: 2, label: 0, conf: 0.18 },
  { sentenceId: 3, label: 1, conf: 0.87 },
  { sentenceId: 4, label: 0, conf: 0.14 },
  { sentenceId: 5, label: 1, conf: 0.91 },
  { sentenceId: 6, label: 0, conf: 0.22 },
  { sentenceId: 7, label: 0, conf: 0.19 },
  { sentenceId: 8, label: 1, conf: 0.84 },
  { sentenceId: 9, label: 0, conf: 0.16 },
  { sentenceId: 10, label: 1, conf: 0.89 },
  { sentenceId: 11, label: 0, conf: 0.11 },
  { sentenceId: 12, label: 0, conf: 0.20 },
  { sentenceId: 13, label: 1, conf: 0.78 },
  { sentenceId: 14, label: 0, conf: 0.17 },
  { sentenceId: 15, label: 0, conf: 0.13 },
];

export const DEMO_TOPICS = [
  { id: 1, label: 'Introduction to Neural Networks', start: '00:00', end: '01:13', startSec: 0, endSec: 73, sentenceIds: [1, 2], sentenceCount: 2, preview: 'Today we will introduce the foundational concepts behind artificial neural networks, which are loosely inspired by biological neural networks in the human brain...' },
  { id: 2, label: 'Gradient Descent & Optimization', start: '01:13', end: '02:47', startSec: 73, endSec: 167, sentenceIds: [3, 4], sentenceCount: 2, preview: 'Gradient descent is an iterative optimization algorithm used to minimize the loss function. The learning rate hyperparameter controls the step size during updates...' },
  { id: 3, label: 'Backpropagation Algorithm', start: '02:47', end: '04:31', startSec: 167, endSec: 271, sentenceIds: [5, 6, 7], sentenceCount: 3, preview: 'Backpropagation applies the chain rule of calculus to propagate error signals from the output layer. The forward pass produces predictions before gradients are computed...' },
  { id: 4, label: 'Activation Functions', start: '04:31', end: '06:02', startSec: 271, endSec: 362, sentenceIds: [8, 9], sentenceCount: 2, preview: 'Activation functions introduce essential non-linearity, allowing networks to model complex relationships. ReLU, sigmoid, and tanh are the most commonly used functions...' },
  { id: 5, label: 'Regularization Techniques', start: '06:02', end: '07:45', startSec: 362, endSec: 465, sentenceIds: [10, 11, 12], sentenceCount: 3, preview: 'Regularization prevents overfitting by constraining model complexity. Dropout randomly disables neurons, while L2 weight decay penalizes large parameter magnitudes...' },
  { id: 6, label: 'Convolutional Neural Networks', start: '07:45', end: '09:30', startSec: 465, endSec: 570, sentenceIds: [13, 14, 15], sentenceCount: 3, preview: 'Batch normalization stabilizes training by normalizing layer activations. Convolutional Neural Networks process structured grid data using learnable spatial filters...' },
];

export const DEMO_SUMMARIES = [
  { topicId: 1, summary: 'Artificial neural networks are computational systems inspired by biological neural networks, organized into interconnected layers of neurons. Each connection weight is adjusted during training to minimize prediction error, enabling the network to recognize patterns in data.' },
  { topicId: 2, summary: 'Gradient descent minimizes the loss function by iteratively adjusting parameters opposite to the gradient direction. The learning rate hyperparameter controls step size — too large causes divergence, too small causes slow convergence.' },
  { topicId: 3, summary: 'Backpropagation computes gradients through the network using the chain rule, propagating error signals from output to input layers. The forward pass generates predictions, after which gradients are used to update weights during the backward pass.' },
  { topicId: 4, summary: 'Activation functions such as ReLU, sigmoid, and tanh introduce non-linearity, enabling networks to model complex relationships beyond linear transformations. Without them, deep networks would be functionally equivalent to a single linear layer.' },
  { topicId: 5, summary: 'Regularization techniques prevent overfitting by constraining model complexity. Dropout randomly deactivates neurons to discourage co-adaptation, while L2 regularization penalizes large weight magnitudes to prevent over-reliance on individual features.' },
  { topicId: 6, summary: 'Batch normalization reduces internal covariate shift by normalizing layer activations within mini-batches, enabling higher learning rates. Convolutional Neural Networks extend these principles using learnable spatial filters to detect local image features.' },
];

export const VERIFIED_METRICS = {
  dataset: { lectureVideos: 40, queriesPerVideo: 10, totalQueries: 400, annotatedBoundaries: 85, annotatedVideos: 10, trainSplit: 8, valSplit: 2 },
  multiSeg: { hitAt5s: 3.5, hitAt10s: 4.7, label: 'Pretrained MultiSeg baseline — lecture-domain adaptation in progress.' },
  bart: { bertF1: 0.8277, label: 'BART selected based on BERT-F1 in model comparison study.' },
};

export const BART_COMPARISON = [
  { model: 'BART', bertF1: '0.8277', inference: 'Moderate', memory: 'Moderate', selected: true },
  { model: 'FLAN-T5', bertF1: 'Lower', inference: 'Fast', memory: 'Low', selected: false },
  { model: 'LED', bertF1: 'Lower', inference: 'Slow', memory: 'High', selected: false },
  { model: 'PEGASUS', bertF1: 'Lower', inference: 'Slow', memory: 'High', selected: false },
  { model: 'TextRank', bertF1: 'Lowest', inference: 'Fast', memory: 'Low', selected: false },
];

export const TRACE_STEPS = [
  { stepIndex: 0, label: 'Video Upload', sublabel: 'Input', upcoming: false },
  { stepIndex: 1, label: 'Whisper ASR', sublabel: 'Speech Recognition', upcoming: false },
  { stepIndex: 2, label: 'Timestamped Transcript', sublabel: 'ASR Output', upcoming: false },
  { stepIndex: 3, label: 'MultiSeg Analysis', sublabel: 'Boundary Detection', upcoming: false },
  { stepIndex: 4, label: 'Topic Boundaries', sublabel: 'MultiSeg Output', upcoming: false },
  { stepIndex: 5, label: 'BART Summarization', sublabel: 'Compression', upcoming: false },
  { stepIndex: 6, label: 'Topic Summaries', sublabel: 'BART Output', upcoming: false },
  { stepIndex: 7, label: 'Pipeline Complete', sublabel: 'Final Representation', upcoming: false },
  { stepIndex: 8, label: 'Semantic Retrieval', sublabel: 'Next Research Phase', upcoming: true },
];
