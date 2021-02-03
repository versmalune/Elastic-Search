const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosastic = require('mongoosastic');

const LicenseSchema = new Schema({
  type: String,
  name: String,
  url: String
});

const CreatorSchema = new Schema({
  type: String,
  name: String,
  url: String,
  image: String
});

const includedInDataCatalogSchema = new Schema({
  type: String,
  name: String,
  url: String
})

const accessModeSufficientSchema = new Schema({
  type: String,
  itemListElement: [
    Schema.Types.Mixed
  ]
})

const accountablePersonSchema = new Schema({
  type: String,
  name: String,
  url: String,
  image: String
})

const aggregateRatingSchema = new Schema({
  type: String,
  ratingValue: Number,
  reviewCount: Number
})

const audienceSchema = new Schema({
  type: String,
  name: String
})

const DatasetSchema = new Schema({
  context: String, 
  type: String,
  name: String,
  description: String,
  url: String,
  sameAs: String,
  version: Number,
  keywords: [String],
  license: LicenseSchema,
  identifier:[String],
  includedInDataCatalog: includedInDataCatalogSchema,
  creator: [CreatorSchema],
  distribution: [Schema.Types.Mixed],
  commentCount: Number,
  dateModified: Date,
  discussionUrl: String,
  alternateName: String,
  isAccessibleForFree: Boolean,
  thumbnailUrl: String,
  interactionStatistic: [Schema.Types.Mixed],
  issn: String,
  measurementTechnique: String,
  variableMeasured: String,
  about: Schema.Types.Mixed,
  abstract: String,
  accessMode: [String],
  accessModeSufficient: accessModeSufficientSchema,
  accessibilityAPI: String,
  accessibilityControl: [String],
  accessibilityFeature: [String],
  accessibilityHazard: [String],
  accessibilitySummary: String,
  accountablePerson: accountablePersonSchema,
  acquireLicensePage: Schema.Types.Mixed,
  aggregateRating: aggregateRatingSchema,
  alternativeHeadline: String,
  assesses: Schema.Types.Mixed,
  associatedMedia: Schema.Types.Mixed,
  audience: audienceSchema,
  audio: Schema.Types.Mixed,
  author: Schema.Types.Mixed,
  award: String,
  charactor: Schema.Types.Mixed,
  citation: Schema.Types.Mixed,
  comment: Schema.Types.Mixed,
  conditionsOfAccess: String,
  contentLocation: Schema.Types.Mixed,
  contentRating: Schema.Types.Mixed,
  contentReferenceTime: Date,
  contributor: Schema.Types.Mixed,
  copyrightHolder: Schema.Types.Mixed,
  copyrightNotice: String,
  copyrightYear: Number,
  correction: Schema.Types.Mixed,
  creativeWorkStatus: Schema.Types.Mixed,
  creditText: String,
  dateCreated: Date,
  datePublished: Date,
  editEIDR: String,
  editor: CreatorSchema,
  educationalAlignment: Schema.Types.Mixed,
  educationalLevel: String,
  educationalUse: String,
  encoding: Schema.Types.Mixed,
  encodingFormat: String,
  exampleOfWork: Schema.Types.Mixed,
  expires: Date,
  funder: Schema.Types.Mixed,
  genre: String,
  hasPart: String,
  headline: Schema.Types.Mixed,
  inLanguage: String,
  interactivityType: String,
  isBasedOn: Schema.Types.Mixed,
  isFamilyFriendly: Boolean,
  isPartOf: Schema.Types.Mixed,
  learningResourceType: Schema.Types.Mixed,
  localtionCreated: Schema.Types.Mixed,
  mainEntity: Schema.Types.Mixed,
  maintainer: Schema.Types.Mixed,
  material: Schema.Types.Mixed,
  materialExtent: Schema.Types.Mixed,
  mentions: Schema.Types.Mixed,
  offers: Schema.Types.Mixed,
  pattern: Schema.Types.Mixed,
  position: String,
  producer: Schema.Types.Mixed,
  provider: Schema.Types.Mixed,
  publication: Schema.Types.Mixed,
  publisher: Schema.Types.Mixed,
  publisherImprint: Schema.Types.Mixed,
  publishingPrinciples: Schema.Types.Mixed,
  recordedAt: Schema.Types.Mixed,
  releasedEvent: Schema.Types.Mixed,
  review: Schema.Types.Mixed,
  schemaVersion: String,
  sdDatePublished: Schema.Types.Mixed,
  size: Schema.Types.Mixed,
  sourceOrganization: Schema.Types.Mixed,
  spatial: Schema.Types.Mixed,
  spatialCoverage: Schema.Types.Mixed,
  sponsor: Schema.Types.Mixed,
  teaches: Schema.Types.Mixed,
  temporal: Schema.Types.Mixed,
  temporalCoverage: Schema.Types.Mixed,
  text: String,
  timeRequired: Schema.Types.Mixed,
  translationOfWork: Schema.Types.Mixed,
  translator: Schema.Types.Mixed,
  typicalAgeRange: String,
  usageInfo: Schema.Types.Mixed,
  video: Schema.Types.Mixed,
  workExample: Schema.Types.Mixed,
  workTranslation: Schema.Types.Mixed,
  additionalType: String,
  disambiguatingDescription: String,
  image: Schema.Types.Mixed,
  mainEntityOfPage: Schema.Types.Mixed,
  potentialAction : Schema.Types.Mixed,
  subjectOf : Schema.Types.Mixed,
},   
{ collection : 'dataset' });

DatasetSchema.plugin(mongoosastic, {
  hosts: [
    'localhost:9200'
  ]
});

const Dataset = mongoose.model('dataset', DatasetSchema)

Dataset.createMapping({
  "mappings": {
    "dynamic_templates": [
      {
        "strings": {
          "match_mapping_type": "string",
          "mapping": {
            "type": "text"
          }
        }
      }
    ]
  }
}, function (err,mapping) {
  if(err){
  console.log('error creating mapping (you can safely ignore this)');
  console.log(err);
}else{
  console.log('Dataset mapping created!');
  console.log(mapping);
  }
});

let stream = Dataset.synchronize();
let count = 0;

stream.on('data', function(err, doc){
	count++;
	console.log(count);
});
stream.on('close', function(){
	console.log('indexed all  documents!');
});
stream.on('error', function(err){
	console.log(err);
});

module.exports = Dataset;
