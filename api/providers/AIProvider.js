class AIProvider {
  /**
   * Generate a tarot reading using the configured AI provider.
   *
   * @param {Object} params
   * @param {string} params.systemPrompt
   * @param {string} params.userPrompt
   * @param {number} [params.temperature]
   * @returns {Promise<Object>}
   */
  async generateReading({
    systemPrompt,
    userPrompt,
    temperature = 0.7,
  }) {
    throw new Error(
      "generateReading() must be implemented by a provider"
    );
  }
}

export default AIProvider;