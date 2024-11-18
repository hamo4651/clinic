<?php declare(strict_types=1);

namespace App\GraphQL\Scalars;

use GraphQL\Language\AST\Node;
use GraphQL\Language\AST\StringValueNode;
use GraphQL\Type\Definition\ScalarType;

/** Read more about scalars here: https://webonyx.github.io/graphql-php/type-definitions/scalars. */
final class Time extends ScalarType
{
    /** Serializes an internal value to include in a response. */
    public function serialize(mixed $value)
    {
     return $value;
   }

    /** Parses an externally provided value (query variable) to use as an input. */
    public function parseValue(mixed $value)
    {

    return $value;
    }

    
    public function parseLiteral(Node $valueNode, ?array $variables = null)
    {

        if ($valueNode instanceof StringValueNode ) {
            return $valueNode->value;
        }

        return null; // Invalid format or unsupported node type
    }
}
