<?php declare(strict_types=1);

namespace App\Http\Controllers;

use App\Enums\Common\ErrorCode;
use Exception;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /**
     * エラー内容を取得する
     * @param ErrorCode $errorCode
     * @param Exception $e
     * @param int $statusCode
     * @return array
     * @throws ValidationException
     */
    public function getError(
        ErrorCode $errorCode,
        Exception $e,
        int $statusCode = Response::HTTP_INTERNAL_SERVER_ERROR,
    ): array {
        if ($e instanceof ValidationException) {
            throw $e;
        }

        return [
            'error' => [
                'status'  => $statusCode,
                'code'    => $errorCode->value,
                'title'   => $errorCode->getErrorMessage(),
                'message' => "{$statusCode}｜{$e->getMessage()}\n{$e->getFile()}:{$e->getLine()}",
            ],
        ];
    }
}
